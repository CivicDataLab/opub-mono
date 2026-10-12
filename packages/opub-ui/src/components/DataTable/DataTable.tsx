'use client';

import React from 'react';
import {
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import type {
  DataTableColumnMeta,
  DataTableProps,
  DataTableRowAction,
  FilterField,
  TableFiltersState,
  TablePaginationState,
  TableSortingState,
} from '../../types/datatable';
import { FILTER_CONDITIONS } from '../../types/datatable';
import { cn, debounce } from '../../utils';
import { AlertDialog } from '../AlertDialog';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { IconButton } from '../IconButton';
import { Skeleton } from '../Skeleton';
import { Footer } from '../Table';
import { Text } from '../Text';
import { Cell, FilterChips, HeaderCell, Row, Toolbar } from './components';
import {
  isPopoverFilter,
  ManagementChrome,
} from './components/ManagementChrome/ManagementChrome';
import { RowAction } from './components/Row';
import styles from './DataTable.module.scss';
import {
  columnFilterFn,
  columnFiltersToFilterFields,
  filtersToColumnFilters,
  groupFiltersByField,
} from './filterUtils';

declare module '@tanstack/table-core' {
  interface FilterFns {
    columnFilter: FilterFn<unknown>;
  }
}

function toTanStackSorting(sorting: TableSortingState): SortingState {
  return sorting.map((sort) => ({
    id: sort.field,
    desc: sort.direction === 'desc',
  }));
}

function fromTanStackSorting(sorting: SortingState): TableSortingState {
  return sorting.map((sort) => ({
    field: sort.id,
    direction: sort.desc ? 'desc' : 'asc',
  }));
}

function columnResponsiveClass(meta?: DataTableColumnMeta) {
  if (meta?.responsive === 'md') return styles.ResponsiveMd;
  if (meta?.responsive === 'lg') return styles.ResponsiveLg;
  return undefined;
}

const SEARCH_DEBOUNCE_MS = 300;

function actionLabel(action: DataTableRowAction) {
  return typeof action.label === 'function' ? action.label() : action.label;
}

type ExplicitColumnSize = {
  size?: number;
  minSize?: number;
  maxSize?: number;
};

/** Pixel widths written on the column def. TanStack later fills a missing size with 150. */
function collectColumnSizes(columns: any[]) {
  const sizes = new Map<string, ExplicitColumnSize>();

  const walk = (defs: any[]) => {
    defs.forEach((column) => {
      const id = column?.id ?? column?.accessorKey;
      const size = column?.size;
      const minSize = column?.minSize;
      const maxSize = column?.maxSize;
      if (id && (size != null || minSize != null || maxSize != null)) {
        sizes.set(id, {
          ...(size != null ? { size } : {}),
          ...(minSize != null ? { minSize } : {}),
          ...(maxSize != null ? { maxSize } : {}),
        });
      }
      if (Array.isArray(column?.columns)) walk(column.columns);
    });
  };

  walk(columns ?? []);
  return sizes;
}

/** First column with `searchable`. Later searchable columns are ignored. */
function findSearchableColumnId(columns: any[]): string | undefined {
  let found: string | undefined;

  const walk = (defs: any[]) => {
    defs.forEach((column) => {
      if (found) return;
      const id = column?.id ?? column?.accessorKey;
      if (id && column?.searchable) found = String(id);
      if (!found && Array.isArray(column?.columns)) walk(column.columns);
    });
  };

  walk(columns ?? []);
  return found;
}

function withSearchFilter(
  filters: TableFiltersState,
  columnId: string,
  query: string
): TableFiltersState {
  const rest = filters.filter(
    (filter) =>
      !(
        filter.field === columnId &&
        filter.condition === FILTER_CONDITIONS.icontains
      )
  );
  const value = query.trim();
  if (!value) return rest;
  return [
    ...rest,
    {
      field: columnId,
      condition: FILTER_CONDITIONS.icontains,
      value,
    },
  ];
}

function columnSizeStyle(
  sizing?: ExplicitColumnSize
): React.CSSProperties | undefined {
  if (!sizing) return undefined;
  const { size, minSize, maxSize } = sizing;
  const style: React.CSSProperties = {};

  if (size != null) {
    style.width = size;
    style.minWidth = minSize ?? size;
    style.maxWidth = maxSize ?? size;
  } else {
    if (minSize != null) style.minWidth = minSize;
    if (maxSize != null) style.maxWidth = maxSize;
  }

  if (style.maxWidth != null) style.overflow = 'hidden';
  return style;
}

const DataTable = (props: DataTableProps) => {
  const {
    rows,
    columns,
    columnContentTypes: columnTypes,
    hoverable = true,
    increasedTableDensity = true,
    hasZebraStripingOnData = false,
    truncate = false,
    defaultSortDirection = 'asc',
    initialSortColumnIndex: sortedColumnIndex,
    onSort,
    onRowSelectionChange,
    defaultSelectedRows = [],
    hideFooter = false,
    rowActions,
    addToolbar,
    showFilterChips = false,
    filters,
    withServer = false,
    sortColumns,
    hideSelection = false,
    hideViewSelector = false,
    placeholder = 'Global Filter',
    emptyState,
    defaultRowCount = 10,
    paginationControls,
    isCustomization,
    handlePageSizeChange,
    args,
    totalPages,
    totalRows,
    pageIdx,
    pageSize,
    labels,
    filterState: filterStateProp,
    sortingState: sortingStateProp,
    paginationState: paginationStateProp,
    onFiltersChange,
    onSortingChange: onServerSortingChange,
    onPaginationChange,
    title,
    subtitle,
    addLabel,
    onAdd,
    searchState: searchStateProp,
    onSearchChange,
    statuses,
    statusState: statusStateProp,
    onStatusChange,
    statusCounts,
    getRowActions,
    loading = false,
    loadError = false,
    onRetry,
    height = '100vh',
    ...others
  } = props;

  const [rowSelection, setRowSelection] = React.useState({});
  const [rowSelectionObj, setRowSelectionObj] = React.useState([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [filtersState, setFiltersState] = React.useState<TableFiltersState>(
    () => filterStateProp ?? []
  );
  const [sortingState, setSortingState] = React.useState<TableSortingState>(
    () => sortingStateProp ?? []
  );
  const [serverPagination, setServerPagination] =
    React.useState<TablePaginationState>(
      () =>
        paginationStateProp ?? {
          limit: defaultRowCount,
          offset: 0,
        }
    );
  const [searchValue, setSearchValue] = React.useState(searchStateProp ?? '');
  const [pendingAction, setPendingAction] =
    React.useState<DataTableRowAction | null>(null);
  const committedSearchRef = React.useRef(searchStateProp ?? '');
  const commitSearchRef = React.useRef<(query: string) => void>(() => undefined);
  const debouncedCommitSearch = React.useMemo(
    () =>
      debounce((query: string) => {
        commitSearchRef.current(query);
      }, SEARCH_DEBOUNCE_MS),
    []
  );
  const [activeStatus, setActiveStatus] = React.useState(
    statusStateProp ?? 'all'
  );

  const showManagementChrome = Boolean(
    title || statuses?.length || onSearchChange
  );

  const columnFilters = React.useMemo(
    () => filtersToColumnFilters(filtersState),
    [filtersState]
  );

  const sorting = React.useMemo(
    () => toTanStackSorting(sortingState),
    [sortingState]
  );

  // Sync controlled props (allow empty arrays / zero offset)
  React.useEffect(() => {
    if (filterStateProp !== undefined) {
      setFiltersState(filterStateProp);
    }
  }, [filterStateProp]);

  React.useEffect(() => {
    if (sortingStateProp !== undefined) {
      setSortingState(sortingStateProp);
    }
  }, [sortingStateProp]);

  React.useEffect(() => {
    if (paginationStateProp !== undefined) {
      setServerPagination(paginationStateProp);
    }
  }, [paginationStateProp]);

  React.useEffect(() => () => debouncedCommitSearch.cancel(), [debouncedCommitSearch]);

  React.useEffect(() => {
    if (searchStateProp === undefined) return;
    if (searchStateProp === committedSearchRef.current) return;
    debouncedCommitSearch.cancel();
    committedSearchRef.current = searchStateProp;
    setSearchValue(searchStateProp);
  }, [searchStateProp, debouncedCommitSearch]);

  React.useEffect(() => {
    if (statusStateProp !== undefined) {
      setActiveStatus(statusStateProp);
    }
  }, [statusStateProp]);

  const updatePagination = React.useCallback(
    (patch: Partial<TablePaginationState>) => {
      setServerPagination((prev) => {
        const next = { ...prev, ...patch };
        onPaginationChange?.(next);
        return next;
      });
    },
    [onPaginationChange]
  );

  const searchableColumnId = React.useMemo(
    () => findSearchableColumnId(columns),
    [columns]
  );

  const updateFilters = React.useCallback(
    (columnId: string, fields: FilterField[] | undefined) => {
      if (searchableColumnId && columnId === searchableColumnId) {
        const text =
          fields?.find(
            (field) => field.condition === FILTER_CONDITIONS.icontains
          )?.value ?? '';
        debouncedCommitSearch.cancel();
        committedSearchRef.current = text;
        setSearchValue(text);
        onSearchChange?.(text);
      }

      setFiltersState((prev) => {
        const withoutColumn = prev.filter(
          (filter) => filter.field !== columnId
        );
        const next = fields?.length
          ? [...withoutColumn, ...fields]
          : withoutColumn;
        onFiltersChange?.(next);
        return next;
      });

      if (withServer) {
        updatePagination({ offset: 0 });
      }
    },
    [
      debouncedCommitSearch,
      onFiltersChange,
      onSearchChange,
      searchableColumnId,
      withServer,
      updatePagination,
    ]
  );

  const clearAllFilters = React.useCallback(() => {
    setFiltersState([]);
    onFiltersChange?.([]);
    if (searchableColumnId) {
      debouncedCommitSearch.cancel();
      committedSearchRef.current = '';
      setSearchValue('');
      onSearchChange?.('');
    }
    if (withServer) {
      updatePagination({ offset: 0 });
    }
  }, [
    debouncedCommitSearch,
    onFiltersChange,
    onSearchChange,
    searchableColumnId,
    withServer,
    updatePagination,
  ]);

  const applyMenuFilters = React.useCallback(
    (next: TableFiltersState) => {
      setFiltersState(next);
      onFiltersChange?.(next);
      if (withServer) {
        updatePagination({ offset: 0 });
      }
    },
    [onFiltersChange, withServer, updatePagination]
  );

  const commitSearch = React.useCallback(
    (query: string) => {
      committedSearchRef.current = query;
      onSearchChange?.(query);
      if (searchableColumnId) {
        setFiltersState((prev) => {
          const next = withSearchFilter(prev, searchableColumnId, query);
          onFiltersChange?.(next);
          return next;
        });
      }
      if (withServer) {
        updatePagination({ offset: 0 });
      }
    },
    [onFiltersChange, onSearchChange, searchableColumnId, withServer, updatePagination]
  );
  commitSearchRef.current = commitSearch;

  const updateSearch = React.useCallback(
    (query: string) => {
      setSearchValue(query);
      debouncedCommitSearch(query);
    },
    [debouncedCommitSearch]
  );

  const updateStatus = React.useCallback(
    (status: string) => {
      setActiveStatus(status);
      onStatusChange?.(status);
      if (withServer) {
        updatePagination({ offset: 0 });
      }
    },
    [onStatusChange, withServer, updatePagination]
  );

  const updateSorts = React.useCallback(
    (next: TableSortingState) => {
      setSortingState(next);
      if (withServer) {
        onServerSortingChange?.(next);
      }
    },
    [withServer, onServerSortingChange]
  );

  const handleSortingChange: OnChangeFn<SortingState> = React.useCallback(
    (updater) => {
      const nextTanStack =
        typeof updater === 'function' ? updater(sorting) : updater;
      updateSorts(fromTanStackSorting(nextTanStack));
    },
    [sorting, updateSorts]
  );

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> =
    React.useCallback(
      (updater) => {
        const prevColumnFilters = filtersToColumnFilters(filtersState);
        const nextColumnFilters =
          typeof updater === 'function' ? updater(prevColumnFilters) : updater;
        const next = columnFiltersToFilterFields(nextColumnFilters);
        setFiltersState(next);
        onFiltersChange?.(next);
        if (withServer) {
          updatePagination({ offset: 0 });
        }
      },
      [filtersState, onFiltersChange, withServer, updatePagination]
    );

  // trigger when row selection changes
  React.useEffect(() => {
    const selected: any = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);
    if (onRowSelectionChange) {
      onRowSelectionChange(selected);
    }
    setRowSelectionObj(selected);
  }, [rowSelection]);

  React.useEffect(() => {
    const newSelection: any = {};

    rows.forEach((row, index) => {
      const isRowSelected = defaultSelectedRows.some(
        (selectedRow: any) =>
          JSON.stringify(selectedRow) === JSON.stringify(row)
      );

      if (isRowSelected) {
        newSelection[index] = true;
      }
    });

    if (JSON.stringify(newSelection) !== JSON.stringify(rowSelection)) {
      setRowSelection(newSelection);
    }
  }, []);

  // Client: hide footer when there is no source data.
  // Server: use totalRows (falls back to legacy totalPages = total row count).
  const footerVisible =
    !hideFooter &&
    (withServer ? (totalRows ?? totalPages ?? 0) > 0 : rows.length > 0);
  const tableData = React.useMemo(() => rows, [rows]);

  const columnSizes = React.useMemo(
    () => collectColumnSizes(columns),
    [columns]
  );

  const enhancedColumns = React.useMemo(() => {
    const filterIds = new Set((filters ?? []).map((filter) => filter.columnId));
    if (!filterIds.size && !searchableColumnId) return columns;

    const enable = (defs: any[]): any[] =>
      defs.map((column) => {
        const columnId = column.id ?? column.accessorKey;
        const next = Array.isArray(column.columns)
          ? { ...column, columns: enable(column.columns) }
          : column;
        if (
          columnId &&
          (filterIds.has(columnId) || columnId === searchableColumnId)
        ) {
          return {
            ...next,
            enableColumnFilter: true,
            filterFn: column.filterFn ?? 'columnFilter',
          };
        }
        return next;
      });

    return enable(columns);
  }, [columns, filters, searchableColumnId]);

  const filterFieldsByColumn = React.useMemo(
    () => groupFiltersByField(filtersState),
    [filtersState]
  );

  const columnLabels = React.useMemo(() => {
    const labels: Record<string, string> = {};
    enhancedColumns.forEach((column: any) => {
      const id = column.id ?? column.accessorKey;
      if (!id) return;
      const header = column.header;
      if (typeof header === 'string') {
        labels[id] = header;
      } else if (typeof header === 'function') {
        // fall back to id — function headers aren't plain strings
        labels[id] = id;
      }
    });
    return labels;
  }, [enhancedColumns]);

  const serverPageCount = React.useMemo(() => {
    if (!withServer) return undefined;
    const total = totalRows ?? totalPages ?? 0;
    return Math.max(1, Math.ceil(total / serverPagination.limit) || 1);
  }, [withServer, totalRows, totalPages, serverPagination.limit]);

  const table = useReactTable({
    data: tableData,
    columns: enhancedColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      ...(withServer
        ? {
            pagination: {
              pageIndex: Math.floor(
                serverPagination.offset / serverPagination.limit
              ),
              pageSize: serverPagination.limit,
            },
          }
        : {}),
    },
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: withServer ? undefined : getSortedRowModel(),
    getFilteredRowModel: withServer ? undefined : getFilteredRowModel(),
    getPaginationRowModel: withServer ? undefined : getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: withServer ? undefined : getFacetedRowModel(),
    getFacetedUniqueValues: withServer ? undefined : getFacetedUniqueValues(),
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: !hideSelection,
    manualFiltering: withServer,
    manualSorting: withServer,
    manualPagination: withServer,
    pageCount: serverPageCount,
    filterFns: {
      columnFilter: columnFilterFn,
    },
  });

  React.useLayoutEffect(() => {
    if (!withServer) {
      table.setPageSize(defaultRowCount);
    }
  }, [defaultRowCount, withServer, table]);

  const rowCountIsEven = rows.length % 2 === 0;
  const themeClass = cn(
    styles.DataTable,
    hasZebraStripingOnData && styles.ZebraStripingOnData,
    hasZebraStripingOnData && rowCountIsEven && styles.RowCountIsEven,
    increasedTableDensity && styles.IncreasedTableDensity
  );

  const tableRowClassname = cn(styles.TableRow, hoverable && styles.Hoverable);
  const selectedCount = Object.keys(rowSelection).length;
  const visibleRows = table.getRowModel().rows;
  const isEmpty = visibleRows.length === 0;
  const emptyMessage = emptyState ?? labels?.empty ?? 'No data';
  const showActionsColumn = Boolean(rowActions || getRowActions);
  const emptyColSpan =
    table.getVisibleLeafColumns().length +
    (hideSelection ? 0 : 1) +
    (showActionsColumn ? 1 : 0);
  const popoverFilterIds = new Set(
    showManagementChrome
      ? (filters ?? []).filter(isPopoverFilter).map((filter) => filter.columnId)
      : []
  );

  const serverPaginationControls = React.useMemo(() => {
    if (!withServer) return paginationControls;

    const { limit, offset } = serverPagination;
    const total = totalRows ?? totalPages ?? 0;
    const lastOffset = Math.max(0, Math.floor((total - 1) / limit) * limit);

    return {
      goToFirstPage: () => updatePagination({ offset: 0 }),
      goToPreviousPage: () =>
        updatePagination({ offset: Math.max(0, offset - limit) }),
      goToNextPage: () =>
        updatePagination({
          offset: Math.min(lastOffset, offset + limit),
        }),
      goToLastPage: () => updatePagination({ offset: lastOffset }),
    };
  }, [
    withServer,
    paginationControls,
    serverPagination,
    totalRows,
    totalPages,
    updatePagination,
  ]);

  const resolvedPageIdx = withServer ? serverPagination.offset : pageIdx;
  const resolvedPageSize = withServer ? serverPagination.limit : pageSize;
  const resolvedTotalPages = withServer
    ? (totalRows ?? totalPages)
    : totalPages;
  const resolvedIsCustomization = withServer ? true : isCustomization;
  const resolvedHandlePageSizeChange = withServer
    ? (size: number) => updatePagination({ limit: size, offset: 0 })
    : handlePageSizeChange;

  return (
    <>
      {showFilterChips && (
        <FilterChips
          filters={filtersState}
          filterConfigs={filters}
          columnLabels={columnLabels}
          onRemove={(field) => updateFilters(field, undefined)}
          onClearAll={clearAllFilters}
        />
      )}
      <div
        className={`opub-DataTable ${themeClass}`}
        {...others}
        style={{
          ...(others.style as React.CSSProperties | undefined),
          ['--op-data-table-height' as string]:
            typeof height === 'number' ? `${height}px` : height,
        }}
      >
        {showManagementChrome && (
          <ManagementChrome
            title={title}
            subtitle={subtitle}
            addLabel={addLabel}
            onAdd={onAdd}
            searchValue={searchValue}
            onSearchChange={updateSearch}
            placeholder={placeholder}
            filters={filters}
            filtersState={filtersState}
            onApplyFilters={applyMenuFilters}
            table={table}
            statuses={statuses}
            statusState={activeStatus}
            onStatusChange={updateStatus}
            statusCounts={statusCounts}
          />
        )}
        {addToolbar && !withServer && !showManagementChrome && (
          <Toolbar
            filters={filters}
            table={table}
            hideViewSelector={hideViewSelector}
            placeholder={placeholder}
          />
        )}

        <div
          className={cn(
            styles.ScrollContainer,
            showManagementChrome && styles.withManagement,
            (addToolbar || showFilterChips || showManagementChrome) &&
              styles.withFilter
          )}
        >
          <table className={styles.Table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  className={cn(tableRowClassname, styles.TableHeaderRow)}
                  key={headerGroup.id}
                >
                  {!hideSelection && (
                    <th
                      className={cn(
                        styles.Cell,
                        styles['Cell-header'],
                        styles.Checkbox
                      )}
                    >
                      <Checkbox
                        name={headerGroup.id}
                        checked={
                          table.getIsAllPageRowsSelected()
                            ? true
                            : table.getIsSomePageRowsSelected()
                              ? 'indeterminate'
                              : false
                        }
                        onChange={() => table.toggleAllPageRowsSelected()}
                      />
                    </th>
                  )}
                  {headerGroup.headers.map((header, index) => {
                    const text = flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    );
                    const isSortable =
                      header.column.getCanSort() &&
                      !!sortColumns?.includes(header.id);

                    const isSorted = header.column.getIsSorted();
                    // Header filter buttons require an explicit `type` so
                    // legacy toolbar-only configs ({ columnId, options }) stay unchanged.
                    // Select filters listed in the management Filter menu are not repeated here.
                    const columnFilter = filters?.find(
                      (filter) =>
                        filter.columnId === header.id &&
                        filter.type != null &&
                        !popoverFilterIds.has(header.id)
                    );

                    return (
                      <HeaderCell
                        className={cn(
                          styles.Cell,
                          styles['Cell-header'],
                          columnResponsiveClass(
                            header.column.columnDef.meta as
                              | DataTableColumnMeta
                              | undefined
                          ),
                          columnTypes &&
                            columnTypes[index] === 'numeric' &&
                            styles['Cell-numeric'],
                          isSortable && isSorted && styles['Cell-sorted'],
                          isSortable && styles['Cell-sortable']
                        )}
                        key={header.id}
                        header={header}
                        sortable={isSortable}
                        text={text}
                        columnType={columnTypes && columnTypes[index]}
                        defaultSortDirection={defaultSortDirection}
                        filter={columnFilter}
                        filterFields={filterFieldsByColumn.get(header.id) ?? []}
                        onFilterChange={updateFilters}
                        style={columnSizeStyle(columnSizes.get(header.column.id))}
                      />
                    );
                  })}
                  {showActionsColumn && (
                    <th
                      className={cn(
                        styles.Cell,
                        styles['Cell-header'],
                        styles.RowAction
                      )}
                    >
                      {getRowActions ? (
                        <Text variant="bodySm" fontWeight="medium">
                          Actions
                        </Text>
                      ) : (
                        <div className="relative flex items-center justify-center">
                          {selectedCount ? (
                            <span className={styles.SelectCount}>
                              <Text variant="bodySm">{selectedCount}</Text>
                            </span>
                          ) : null}
                          <RowAction
                            callbackContent={rowSelectionObj}
                            rowActions={rowActions}
                          />
                        </div>
                      )}
                    </th>
                  )}
                </tr>
              ))}
            </thead>
            <tbody>
              {loadError ? (
                <tr className={cn(tableRowClassname, styles.TableBodyRow)}>
                  <td
                    className={cn(styles.Cell, styles.EmptyCell)}
                    colSpan={Math.max(emptyColSpan, 1)}
                  >
                    <div className={styles.EmptyState}>
                      <div className={styles.ErrorState}>
                        <Text variant="bodyMd" color="subdued">
                          Couldn&apos;t load data.
                        </Text>
                        {onRetry ? (
                          <Button kind="tertiary" onClick={onRetry}>
                            Retry
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : loading ? (
                Array.from({
                  length: Number(resolvedPageSize || defaultRowCount) || 10,
                }).map((_, rowIndex) => (
                  <tr
                    key={`loading-${rowIndex}`}
                    className={cn(styles.TableRow, styles.TableBodyRow)}
                    aria-busy={rowIndex === 0 ? true : undefined}
                  >
                    {!hideSelection ? (
                      <td className={cn(styles.Cell, styles.Checkbox)}>
                        <Skeleton className={styles.LoadingCellShort} />
                      </td>
                    ) : null}
                    {table.getVisibleLeafColumns().map((column, index) => (
                      <td key={column.id} className={cn(styles.Cell)}>
                        {rowIndex === 0 && index === 0 ? (
                          <Text visuallyHidden>Loading</Text>
                        ) : null}
                        <Skeleton
                          className={styles.LoadingCell}
                          style={{ width: `${48 + ((index * 17) % 40)}%` }}
                        />
                      </td>
                    ))}
                    {showActionsColumn ? (
                      <td className={cn(styles.Cell, styles.RowAction)}>
                        <Skeleton className={styles.LoadingCellShort} />
                      </td>
                    ) : null}
                  </tr>
                ))
              ) : isEmpty ? (
                <tr className={cn(tableRowClassname, styles.TableBodyRow)}>
                  <td
                    className={cn(styles.Cell, styles.EmptyCell)}
                    colSpan={Math.max(emptyColSpan, 1)}
                  >
                    <div className={styles.EmptyState}>
                      {typeof emptyMessage === 'string' ? (
                        <Text variant="bodyMd" color="subdued">
                          {emptyMessage}
                        </Text>
                      ) : (
                        emptyMessage
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                visibleRows.map((row) => (
                  <Row
                    key={row.id}
                    row={row}
                    hideSelection={hideSelection}
                    classname={cn(
                      tableRowClassname,
                      styles.TableBodyRow,
                      row.getCanSelect() && styles['TableRow-selectable'],
                      row.getIsSelected() && styles['TableRow-selected']
                    )}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      const text = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      );
                      const columnMeta = cell.column.columnDef.meta as
                        | DataTableColumnMeta
                        | undefined;
                      const truncateColumn = truncate || Boolean(columnMeta?.truncate);
                      return (
                        <Cell
                          className={cn(
                            styles.Cell,
                            columnResponsiveClass(columnMeta),
                            columnTypes &&
                              columnTypes[index] === 'numeric' &&
                              styles['Cell-numeric'],
                            index === 0 && styles['Cell-firstColumn'],
                            truncate && styles['Cell-truncated'],
                            columnMeta?.truncate && styles['Cell-truncateColumn']
                          )}
                          key={cell.id}
                          text={text}
                          cell={cell}
                          index={index}
                          truncate={truncateColumn}
                          style={columnSizeStyle(columnSizes.get(cell.column.id))}
                        />
                      );
                    })}
                    {getRowActions ? (
                      <td className={cn(styles.Cell, styles.RowAction)}>
                        <div className={styles.RowActions}>
                          {getRowActions(row.original).map((action) => (
                            <IconButton
                              key={action.key}
                              className={cn(
                                styles.RowActionButton,
                                action.destructive && styles.RowActionCritical
                              )}
                              icon={action.icon}
                              size="slim"
                              color={
                                action.color ??
                                (action.destructive ? 'critical' : 'default')
                              }
                              stroke={action.stroke}
                              onClick={(event) => {
                                event.stopPropagation();
                                if (action.alert) {
                                  setPendingAction(action);
                                  return;
                                }
                                action.onClick();
                              }}
                            >
                              {actionLabel(action)}
                            </IconButton>
                          ))}
                        </div>
                      </td>
                    ) : rowActions ? (
                      <td className={cn(styles.Cell, styles.RowAction)}>
                        <RowAction
                          callbackContent={row.original}
                          rowActions={rowActions}
                        />
                      </td>
                    ) : null}
                  </Row>
                ))
              )}
            </tbody>
          </table>
        </div>
        {footerVisible && (
          <Footer
            {...args}
            handlePageSizeChange={resolvedHandlePageSizeChange}
            pageIdx={resolvedPageIdx}
            pageSize={resolvedPageSize}
            totalPages={resolvedTotalPages}
            table={table}
            paginationControls={serverPaginationControls}
            isCustomization={resolvedIsCustomization}
            labels={labels}
          />
        )}
      </div>
      <AlertDialog
        open={Boolean(pendingAction?.alert)}
        onOpenChange={(open) => {
          if (!open) setPendingAction(null);
        }}
      >
        {pendingAction?.alert ? (
          <AlertDialog.Content
            title={pendingAction.alert.title}
            footer={pendingAction.alert.footer}
            primaryAction={
              pendingAction.alert.primaryAction ?? {
                content: actionLabel(pendingAction),
                destructive: pendingAction.destructive,
                onAction: () => pendingAction.onClick(),
              }
            }
            secondaryActions={
              pendingAction.alert.secondaryActions ?? [{ content: 'Cancel' }]
            }
          >
            {pendingAction.alert.children}
          </AlertDialog.Content>
        ) : null}
      </AlertDialog>
    </>
  );
};

export { DataTable };

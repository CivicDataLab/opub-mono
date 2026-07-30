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
  DataTableProps,
  FilterField,
  TableFiltersState,
  TablePaginationState,
  TableSortingState,
} from '../../types/datatable';
import { cn } from '../../utils';
import { Checkbox } from '../Checkbox/Checkbox';
import { Footer } from '../Table';
import { Text } from '../Text';
import { Cell, FilterChips, HeaderCell, Row, Toolbar } from './components';
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

  const updateFilters = React.useCallback(
    (columnId: string, fields: FilterField[] | undefined) => {
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
    [onFiltersChange, withServer, updatePagination]
  );

  const clearAllFilters = React.useCallback(() => {
    setFiltersState([]);
    onFiltersChange?.([]);
    if (withServer) {
      updatePagination({ offset: 0 });
    }
  }, [onFiltersChange, withServer, updatePagination]);

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

  const enhancedColumns = React.useMemo(() => {
    if (!filters?.length) return columns;
    const filterIds = new Set(filters.map((filter) => filter.columnId));

    return columns.map((column: any) => {
      const columnId = column.id ?? column.accessorKey;
      if (columnId && filterIds.has(columnId)) {
        return {
          ...column,
          enableColumnFilter: true,
          filterFn: column.filterFn ?? 'columnFilter',
        };
      }
      return column;
    });
  }, [columns, filters]);

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
  const emptyColSpan =
    table.getVisibleLeafColumns().length +
    (hideSelection ? 0 : 1) +
    (rowActions ? 1 : 0);

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
      <div className={`opub-DataTable ${themeClass}`} {...others}>
        {addToolbar && !withServer && (
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
            (addToolbar || showFilterChips) && styles.withFilter
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
                    const columnFilter = filters?.find(
                      (filter) =>
                        filter.columnId === header.id && filter.type != null
                    );

                    return (
                      <HeaderCell
                        className={cn(
                          styles.Cell,
                          styles['Cell-header'],
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
                      />
                    );
                  })}
                  {rowActions && (
                    <th
                      className={cn(
                        styles.Cell,
                        styles['Cell-header'],
                        styles.RowAction
                      )}
                    >
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
                    </th>
                  )}
                </tr>
              ))}
            </thead>
            <tbody>
              {isEmpty ? (
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
                      return (
                        <Cell
                          className={cn(
                            styles.Cell,
                            columnTypes &&
                              columnTypes[index] === 'numeric' &&
                              styles['Cell-numeric'],
                            index === 0 && styles['Cell-firstColumn'],
                            truncate && styles['Cell-truncated']
                          )}
                          key={cell.id}
                          text={text}
                          cell={cell}
                          index={index}
                          truncate={truncate}
                        />
                      );
                    })}
                    {rowActions && (
                      <td className={cn(styles.Cell, styles.RowAction)}>
                        <RowAction
                          callbackContent={row.original}
                          rowActions={rowActions}
                        />
                      </td>
                    )}
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
    </>
  );
};

export { DataTable };

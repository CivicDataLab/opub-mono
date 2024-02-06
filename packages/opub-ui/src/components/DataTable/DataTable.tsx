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
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import type { DataTableProps } from '../../types/datatable';
import { cn } from '../../utils';
import { Box } from '../Box';
import { Checkbox } from '../Checkbox/Checkbox';
import { Footer } from '../Table';
import { Text } from '../Text';
import { Cell, HeaderCell, Row, Toolbar } from './components';
import { RowAction } from './components/Row';
import styles from './DataTable.module.scss';

declare module '@tanstack/table-core' {
  interface FilterFns {
    columnFilter: FilterFn<unknown>;
  }
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
    defaultSelectedRows,
    hideFooter = false,
    rowActions,
    addToolbar,
    filters,
    sortColumns,
    hideSelection = false,
    hideViewSelector = false,
    defaultRowCount = 10,
    ...others
  } = props;

  const [rowSelection, setRowSelection] = React.useState({});
  const [rowSelectionObj, setRowSelectionObj] = React.useState([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

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

  const footerVisible = !hideFooter && rows.length > 0;
  const tableData = React.useMemo(() => rows, [rows]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: !hideSelection,
    filterFns: {
      columnFilter: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  });

  React.useLayoutEffect(() => {
    table.setPageSize(defaultRowCount);
  }, [defaultRowCount]);

  const rowCountIsEven = rows.length % 2 === 0;
  const themeClass = cn(
    styles.DataTable,
    hasZebraStripingOnData && styles.ZebraStripingOnData,
    hasZebraStripingOnData && rowCountIsEven && styles.RowCountIsEven,
    increasedTableDensity && styles.IncreasedTableDensity
  );

  const tableRowClassname = cn(styles.TableRow, hoverable && styles.Hoverable);
  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className={`opub-DataTable ${themeClass}`} {...others}>
      {addToolbar && (
        <Toolbar
          filters={filters}
          table={table}
          hideViewSelector={hideViewSelector}
        />
      )}
      <div
        className={cn(styles.ScrollContainer, addToolbar && styles.withFilter)}
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
                    !!sortColumns?.includes(header.id); // whether the column is in the sortColumns array

                  const isSorted = header.column.getIsSorted();

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
                    <Box flex alignItems="center" position="relative">
                      {selectedCount ? (
                        <span className={styles.SelectCount}>
                          <Text variant="bodySm">{selectedCount}</Text>
                        </span>
                      ) : null}
                      <RowAction
                        callbackContent={rowSelectionObj}
                        rowActions={rowActions}
                      />
                    </Box>
                  </th>
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
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
                        index === 0 && truncate && styles['Cell-truncated']
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
            ))}
          </tbody>
        </table>
      </div>
      {footerVisible && <Footer table={table} />}
    </div>
  );
};

export { DataTable };

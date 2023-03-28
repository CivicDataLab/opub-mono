import cx from 'classnames';
import React from 'react';
import styles from './IndexTable.module.scss';

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import type { IndexTableProps } from '@ui/types/datatable';
import { UncontrolledCheckbox } from '../Checkbox/Checkbox';
import { Cell, HeaderCell, Row } from './components';

const IndexTable = (props: IndexTableProps) => {
  const {
    rows,
    columns,
    columnContentTypes: columnTypes = 'text',
    hoverable = true,
    increasedTableDensity = true,
    hasZebraStripingOnData = false,
    truncate = false,
    sortable = false,
    defaultSortDirection = 'asc',
    initialSortColumnIndex: sortedColumnIndex,
    onSort,
    stickyHeader = false,
    onRowSelectionChange,
    defaultSelectedRows,
    ...others
  } = props;
  const [data, setData] = React.useState(() => [...rows]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState(
    defaultSelectedRows || {}
  );

  // trigger when row selection changes
  React.useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(
        table.getSelectedRowModel().flatRows.map((row) => row.original)
      );
    }
  }, [rowSelection]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: sortable ? getSortedRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,

    enableRowSelection: true,
  });

  const rowCountIsEven = data.length % 2 === 0;
  const themeClass = cx(
    styles.DataTable,
    hasZebraStripingOnData && styles.ZebraStripingOnData,
    hasZebraStripingOnData && rowCountIsEven && styles.RowCountIsEven,
    increasedTableDensity && styles.IncreasedTableDensity
  );

  const tableRowClassname = cx(styles.TableRow, hoverable && styles.Hoverable);

  return (
    <div className={`opub-DataTable ${themeClass}`} {...others}>
      <div className={styles.ScrollContainer}>
        <table className={styles.Table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className={cx(tableRowClassname, styles.TableHeaderRow)}
                key={headerGroup.id}
              >
                <th
                  className={cx(
                    styles.Cell,
                    styles['Cell-header'],
                    styles.Checkbox
                  )}
                >
                  <UncontrolledCheckbox
                    name={headerGroup.id}
                    checked={
                      table.getIsAllPageRowsSelected()
                        ? true
                        : table.getIsSomePageRowsSelected()
                        ? 'indeterminate'
                        : false
                    }
                    onCheckedChange={() => table.toggleAllPageRowsSelected()}
                  />
                </th>
                {headerGroup.headers.map((header, index) => {
                  const text = flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  );
                  const isSortable = header.column.getCanSort() && sortable;
                  const isSorted = header.column.getIsSorted();

                  return (
                    <HeaderCell
                      className={cx(
                        styles.Cell,
                        styles['Cell-header'],
                        columnTypes[index] === 'numeric' &&
                          styles['Cell-numeric'],
                        isSortable && isSorted && styles['Cell-sorted'],
                        isSortable && styles['Cell-sortable'],
                        stickyHeader && styles['Header-Sticky']
                      )}
                      key={header.id}
                      header={header}
                      sortable={isSortable}
                      text={text}
                      columnType={columnTypes[index]}
                      defaultSortDirection={defaultSortDirection}
                    />
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Row
                row={row}
                classname={cx(
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
                      className={cx(
                        styles.Cell,
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
              </Row>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export { IndexTable, createColumnHelper };
export type { ColumnDef };

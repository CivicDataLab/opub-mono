import cx from 'classnames';
import React from 'react';
import styles from './DataTable.module.scss';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import type { DataTableProps } from '@ui/types/datatable';
import { Cell, HeaderCell } from './components';

const DataTable = (props: DataTableProps) => {
  const {
    rows,
    columns,
    columnContentTypes: columnTypes = 'text',
    hoverable = true,
    increasedTableDensity = false,
    hasZebraStripingOnData = false,
    truncate = false,
    sortable = false,
    defaultSortDirection = 'asc',
    initialSortColumnIndex: sortedColumnIndex,
    onSort,
    stickyHeader = false,
    ...others
  } = props;
  const [data, setData] = React.useState(() => [...rows]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
                {headerGroup.headers.map((header, index) => {
                  const text = flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  );
                  const sortable = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();

                  return (
                    <HeaderCell
                      className={cx(
                        styles.Cell,
                        styles['Cell-header'],
                        columnTypes[index] === 'numeric' &&
                          styles['Cell-numeric'],
                        isSorted && styles['Cell-sorted'],
                        sortable && styles['Cell-sortable'],
                        stickyHeader && styles['Header-Sticky']
                      )}
                      key={header.id}
                      header={header}
                      sortable={sortable}
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
              <tr
                className={cx(tableRowClassname, styles.TableBodyRow)}
                key={row.id}
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
              </tr>
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

export { DataTable };

'use client';

import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import type { TableProps } from '../../types/datatable';
import { cn } from '../../utils';
import { Cell, Footer, HeaderCell } from './components';
import styles from './Table.module.scss';

const Table = (props: TableProps) => {
  const {
    rows,
    columns,
    columnContentTypes: columnTypes = 'text',
    hoverable = true,
    increasedTableDensity = false,
    hasZebraStripingOnData = false,
    truncate = false,
    sortColumns,
    defaultSortDirection = 'asc',
    initialSortColumnIndex: sortedColumnIndex,
    onSort,
    hideFooter = false,

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
    getPaginationRowModel: hideFooter ? undefined : getPaginationRowModel(),
    filterFns: {
      columnFilter: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  });

  const footerVisible = !hideFooter && data.length > 0;

  const rowCountIsEven = data.length % 2 === 0;
  const themeClass = cn(
    styles.DataTable,
    hasZebraStripingOnData && styles.ZebraStripingOnData,
    hasZebraStripingOnData && rowCountIsEven && styles.RowCountIsEven,
    increasedTableDensity && styles.IncreasedTableDensity
  );

  const tableRowClassname = cn(styles.TableRow, hoverable && styles.Hoverable);

  return (
    <div className={`opub-DataTable ${themeClass}`} {...others}>
      <div className={styles.ScrollContainer}>
        <table className={styles.Table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className={cn(tableRowClassname, styles.TableHeaderRow)}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header, index) => {
                  const text = flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  );
                  const isSortable =
                    header.column.getCanSort() &&
                    !!sortColumns?.includes(header.id);

                  const isSorted = header.column.getIsSorted();

                  return (
                    <HeaderCell
                      className={cn(
                        styles.Cell,
                        styles['Cell-header'],
                        columnTypes[index] === 'numeric' &&
                          styles['Cell-numeric'],
                        isSortable && isSorted && styles['Cell-sorted'],
                        isSortable && styles['Cell-sortable']
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
              <tr
                className={cn(tableRowClassname, styles.TableBodyRow)}
                key={row.id}
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
        </table>
      </div>
      {footerVisible && <Footer table={table} />}
    </div>
  );
};

export { Table };

import cx from 'classnames';
import React from 'react';
import styles from './DataTable.module.scss';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import type { DataTableProps } from '@ui/types/datatable';
import { Tooltip } from '../Tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Button } from '../Button';

const DataTable = (props: DataTableProps) => {
  const {
    rows,
    columns,
    columnContentTypes: columnTypes = 'text',
    hoverable = true,
    increasedTableDensity = false,
    hasZebraStripingOnData = false,
    truncate = false,
    sortable,
    defaultSortDirection = 'ascending',
    initialSortColumnIndex: sortedColumnIndex,
    onSort,
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
                {headerGroup.headers.map((header, index) => (
                  <th
                    className={cx(
                      styles.Cell,
                      styles['Cell-header'],
                      columnTypes[index] === 'numeric' && styles['Cell-numeric']
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <Button
                        plain
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() &&
                          ({
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ??
                            null)}
                      </Button>
                    ) : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
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
                    <td
                      className={cx(
                        styles.Cell,
                        columnTypes[index] === 'numeric' &&
                          styles['Cell-numeric'],
                        index === 0 && styles['Cell-firstColumn'],
                        index === 0 && truncate && styles['Cell-truncated']
                      )}
                      key={cell.id}
                    >
                      {truncate && index === 0 ? (
                        <TruncatedText className={styles.TooltipContent}>
                          {text}
                        </TruncatedText>
                      ) : (
                        text
                      )}
                    </td>
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

const TruncatedText = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const textRef = React.useRef<any | null>(null);
  const { current } = textRef;
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    forceUpdate();
  }, [children]);

  const text = (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );

  return current?.scrollWidth > current?.offsetWidth ? (
    <TooltipProvider>
      <Tooltip delayDuration={0} content={textRef.current.innerText}>
        {text}
      </Tooltip>
    </TooltipProvider>
  ) : (
    text
  );
};

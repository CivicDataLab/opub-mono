import { cn } from '../../../../utils';
import { IconButton } from '../../../IconButton';
import { Select } from '../../../Select';
import { Text } from '../../../Text';
import styles from './Footer.module.scss';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';

const pageSizeOptions = [10, 25, 50, 100];

export const Footer = ({ table }: { table: Table<any> }) => {
  const {
    getPageOptions,
    setPageIndex,
    getCanNextPage,
    getCanPreviousPage,
    getPageCount,
    getState,
    previousPage,
    nextPage,
  } = table;

  const paginationMarkup = (
    <div className={styles.Pagination}>
      <IconButton
        onClick={() => setPageIndex(0)}
        disabled={!getCanPreviousPage()}
        icon={IconChevronsLeft}
      >
        First Page
      </IconButton>
      <IconButton
        onClick={() => previousPage()}
        disabled={!getCanPreviousPage()}
        icon={IconChevronLeft}
      >
        Previous Page
      </IconButton>

      <IconButton
        onClick={() => nextPage()}
        disabled={!getCanNextPage()}
        icon={IconChevronRight}
      >
        Next Page
      </IconButton>
      <IconButton
        onClick={() => setPageIndex(getPageOptions().length - 1)}
        disabled={!getCanNextPage()}
        icon={IconChevronsRight}
      >
        Last Page
      </IconButton>
    </div>
  );

  const pageIndexMarkup = (
    <div>
      <div className={styles.desktopText}>
        <Text noBreak variant="bodyMd">{`Page ${
          getState().pagination.pageIndex + 1
        } of ${getPageCount()}`}</Text>
      </div>
      <div className={styles.mobileText}>
        <Text noBreak variant="bodyMd">{`${
          getState().pagination.pageIndex + 1
        } / ${getPageCount()}`}</Text>
      </div>
    </div>
  );

  const pageSizeMarkup = (
    <Select
      labelInline
      label="Rows: "
      options={pageSizeOptions.map((value) => ({
        value: String(value),
        label: String(value),
      }))}
      value={String(getState().pagination.pageSize)}
      onChange={(e) => {
        table.setPageSize(Number(e));
      }}
    />
  );

  return (
    <div className={cn(styles.Footer)}>
      {pageSizeMarkup}
      <div className={styles.FooterRight}>
        {pageIndexMarkup}
        {paginationMarkup}
      </div>
    </div>
  );
};

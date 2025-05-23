import { number } from 'echarts';
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

export const Footer = ({
  table,
  paginationControls,
  isCustomization,
  handlePageSizeChange,
  pageSize,
  pageIdx,
  totalPages,
}: {
  table: Table<any>;
  paginationControls?: any;
  isCustomization?: boolean;
  handlePageSizeChange?: any;
  pageIdx?: number;
  pageSize?: number;
  totalPages?: number;
}) => {
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
        onClick={() => isCustomization ? handleFirstPage() : setPageIndex(0)}
        disabled={isCustomization ? (pageIdx === 0) : !getCanPreviousPage()}
        icon={IconChevronsLeft}
      >
        First Page
      </IconButton>
      <IconButton
        onClick={() => isCustomization ? handlePreviousPage() : previousPage()}
        disabled={isCustomization ? (pageIdx === 0) : !getCanPreviousPage()}
        icon={IconChevronLeft}
      >
        Previous Page
      </IconButton>

      <IconButton
        onClick={() => isCustomization ? handleNextPage() : nextPage()}
        disabled={isCustomization ? ((pageIdx ?? 0) === (Math.ceil((totalPages ?? 1) / (pageSize ?? 0)) - 1) * (pageSize ?? 0)) : !getCanNextPage()}
        icon={IconChevronRight}
      >
        Next Page
      </IconButton>
      <IconButton
        onClick={() => isCustomization ? handleLastPage() : setPageIndex(getPageOptions().length - 1)}
        disabled={isCustomization ? ((pageIdx ?? 0) === (Math.ceil((totalPages ?? 1) / (pageSize ?? 0)) - 1) * (pageSize ?? 0)) : !getCanNextPage()}
        icon={IconChevronsRight}
      >
        Last Page
      </IconButton>
    </div>
  );

  function handleFirstPage() {
    paginationControls.goToFirstPage();
  }

  function handlePreviousPage() {
    paginationControls.goToPreviousPage();
  }

  function handleNextPage() {
    paginationControls.goToNextPage();
  }

  function handleLastPage() {
    paginationControls.goToLastPage();
  }

  const pageCount = Math.ceil((totalPages ?? 1) / (pageSize ?? 0));
  const indexCount = Math.floor((pageIdx ?? 0) / (pageSize ?? 0));

  const pageIndexMarkup = (
    <div>
      <div className={styles.desktopText}>
        <Text noBreak variant="bodyMd">{`Page ${isCustomization ? indexCount + 1 : getState().pagination.pageIndex + 1} of ${isCustomization ? pageCount : getPageCount()}`}</Text>
      </div>
      <div className={styles.mobileText}>
        <Text noBreak variant="bodyMd">{`${isCustomization ? indexCount + 1 : getState().pagination.pageIndex + 1} / ${isCustomization ? pageCount : getPageCount()}`}</Text>
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
        handlePageSizeChange(Number(e));
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

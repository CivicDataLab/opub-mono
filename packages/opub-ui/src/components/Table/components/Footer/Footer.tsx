import { cn } from '../../../../utils';
import { Icon } from '../../../Icon';
import { Text } from '../../../Text';
import styles from './Footer.module.scss';
import { ChevronLeftMinor, ChevronRightMinor } from '@shopify/polaris-icons';
import { Table } from '@tanstack/react-table';

export const Footer = ({
  table,
  rowData,
  hideResultsInFooter,
  hidePagination,
}: {
  table: Table<any>;
  rowData: {
    rowMin: number;
    rowMax: number;
    total: number;
    pageIndex: number;
  };
  hideResultsInFooter: boolean;
  hidePagination: boolean;
}) => {
  const pageOptions = table.getPageOptions();

  // shorten the text if the table is not paginated
  const extendedText = hidePagination
    ? ''
    : `${rowData.rowMin} - ${rowData.rowMax} of `;
  const footerText = !hideResultsInFooter ? (
    <Text
      variant="bodyMd"
      color="subdued"
    >{`Showing ${extendedText}${rowData.total} results`}</Text>
  ) : null;

  const pagination = !hidePagination ? (
    <div className={styles.Pagination}>
      <button
        className={styles.Button}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <div className={styles.Direction}>
          <Icon source={ChevronLeftMinor} />
          <Text variant="bodyMd">
            Previous
            <Text visuallyHidden> Page</Text>
          </Text>
        </div>
      </button>
      <div className={styles.PaginationItems}>
        <PaginateButton
          pageIndex={rowData.pageIndex}
          paginateIdx={pageOptions[0]}
          setPageIndex={table.setPageIndex}
        />
        <PaginateButton
          pageIndex={rowData.pageIndex}
          paginateIdx={pageOptions[1]}
          setPageIndex={table.setPageIndex}
        />

        <span className={cn(styles.Button, styles.Span)}>...</span>

        <PaginateButton
          pageIndex={rowData.pageIndex}
          paginateIdx={pageOptions.length - 2}
          setPageIndex={table.setPageIndex}
        />
        <PaginateButton
          pageIndex={rowData.pageIndex}
          paginateIdx={pageOptions.length - 1}
          setPageIndex={table.setPageIndex}
        />
      </div>
      <div className={styles.PaginationItemsMobile}>
        <Text variant="bodyMd">{`Page 1 of 8`}</Text>
      </div>
      <button
        className={styles.Button}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <div className={styles.Direction}>
          <Text variant="bodyMd">
            Next
            <Text visuallyHidden> Page</Text>
          </Text>
          <Icon source={ChevronRightMinor} />
        </div>
      </button>
    </div>
  ) : null;

  return (
    <div
      className={cn(
        styles.Footer,
        (hidePagination || hideResultsInFooter) && styles.HiddenContent
      )}
    >
      {footerText}
      {pagination}
    </div>
  );
};

const PaginateButton = ({
  pageIndex,
  paginateIdx,
  setPageIndex,
}: {
  pageIndex: number;
  paginateIdx: number;
  setPageIndex: (pageIndex: number) => void;
}) => {
  return (
    <button
      onClick={() => {
        setPageIndex(paginateIdx);
      }}
      aria-selected={pageIndex === paginateIdx}
      className={styles.Button}
    >
      {paginateIdx + 1}
    </button>
  );
};

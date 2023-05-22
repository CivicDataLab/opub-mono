import { Icon } from '../../../Icon';
import { Text } from '../../../Text';
import styles from './Footer.module.scss';
import { ChevronLeftMinor, ChevronRightMinor } from '@shopify/polaris-icons';
import { Table } from '@tanstack/react-table';
import classNames from 'classnames';

export const Footer = ({
  table,
  rowData,
}: {
  table: Table<any>;
  rowData: {
    rowMin: number;
    rowMax: number;
    total: number;
    pageIndex: number;
  };
}) => {
  const pageOptions = table.getPageOptions();

  const footerText = (
    <Text
      variant="bodyMd"
      color="subdued"
    >{`Showing ${rowData.rowMin} - ${rowData.rowMax} of ${rowData.total} results`}</Text>
  );
  const pagination = (
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

        <span className={classNames(styles.Button, styles.Span)}>...</span>

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
  );

  return (
    <div className={styles.Footer}>
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

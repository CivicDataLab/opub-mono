import { ActionListProps } from '../components/ActionList';

export type SortDirection = 'asc' | 'desc' | 'none';
export type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';
export type ColumnContentType = 'text' | 'numeric' | 'node';

export interface ColumnVisibilityData {
  leftEdge: number;
  rightEdge: number;
  isVisible?: boolean;
  width: number;
  index: number;
}

export interface TableProps {
  /** List of data types, which determines content alignment for each column. Data types are "text," which aligns left, or "numeric," which aligns right. */
  columnContentTypes?: ColumnContentType[];
  /** List of column headers. */
  columns: any[];
  /** List of data rows. */
  rows: any[];
  /** Whether to apply zebra striping to data rows. */
  hasZebraStripingOnData?: boolean;
  /** Table row has hover state. Defaults to true. */
  hoverable?: boolean;
  /** Truncate content in first column instead of wrapping.
   */
  truncate?: boolean;
  /** Increased density */
  increasedTableDensity?: boolean;
  /**
   * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to ascending.
   */
  defaultSortDirection?: SortDirection;
  /**
   * The index of the heading that the table rows are initially sorted by. Defaults to the first column.
   */
  initialSortColumnIndex?: number;
  /** Callback fired on click or keypress of a sortable column heading. */
  onSort?(headingIndex: number, direction: SortDirection): void;

  /** Has Footer  */
  hideFooter?: boolean;
  /** Hide Results in Footer  */
  hideResultsInFooter?: boolean;
  /** specify columns to be sorted  */
  sortColumns?: string[];
  theme?: 'climate' | 'default';
}

export type TableFilterProps = {
  filters?: {
    columnId: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
};

export type DataTableProps = TableProps &
  TableFilterProps & {
    /** Callback function to run on row selection  */
    onRowSelectionChange?(selectedRows: any): void;
    /** Default selected rows  */
    defaultSelectedRows?: any;
    /** Whether to enable the selection/deselection across page  */
    hasMoreItems?: boolean;
    /** List of row actions  */
    rowActions?: ActionListProps['items'];
    /** Add Toolbar  */
    addToolbar?: boolean;
    /** Hide Checkbox  */
    hideSelection?: boolean;

    hideViewSelector?: boolean;
    placeholder?: string;

    defaultRowCount?: 10 | 25 | 50 | 100;

    showPagination ?: boolean;
    paginationControls ?: {
      goToFirstPage: () => void;
      goToPreviousPage: () => void;
      goToNextPage: () => void;
      goToLastPage: () => void;
    };
  };

import type { ReactNode } from 'react';

import { ActionListProps } from '../components/ActionList';

export type SortDirection = 'asc' | 'desc' | 'none';
export type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';
export type ColumnContentType = 'text' | 'numeric' | 'node';

/** Localizable strings for the table footer. All keys are optional and fall back to English defaults. */
export type TableLabels = {
  /** Label for the rows-per-page selector. Default "Rows: " */
  rows?: string;
  /** Page indicator shown on desktop. Default `Page ${current} of ${total}` */
  pageIndex?: (current: number, total: number) => string;
  /** Page indicator shown on mobile. Default `${current} / ${total}` */
  pageIndexMobile?: (current: number, total: number) => string;
  /** First-page button label. Default "First Page" */
  firstPage?: string;
  /** Previous-page button label. Default "Previous Page" */
  previousPage?: string;
  /** Next-page button label. Default "Next Page" */
  nextPage?: string;
  /** Last-page button label. Default "Last Page" */
  lastPage?: string;
  /** Empty table message. Default "No data" */
  empty?: string;
};

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
  /** Localizable strings for the footer. Defaults to English. */
  labels?: TableLabels;
  /** Callback fired when the rows-per-page selection changes. */
  handlePageSizeChange?: (pageSize: number) => void;
}

export const FILTER_CONDITIONS = {
  exact: 'exact',
  iexact: 'iexact',
  contains: 'contains',
  icontains: 'icontains',
  startswith: 'startswith',
  endswith: 'endswith',
  gt: 'gt',
  gte: 'gte',
  lt: 'lt',
  lte: 'lte',
  in: 'in',
} as const;

export type FilterCondition =
  (typeof FILTER_CONDITIONS)[keyof typeof FILTER_CONDITIONS];

/** Server/client filter field shape */
export type FilterField = {
  field: string;
  condition: FilterCondition;
  value: string;
};

export type ColumnFilterType =
  | 'text'
  | 'numeric'
  | 'date'
  | 'boolean'
  | 'select'
  | 'multiSelect';

export type ColumnFilterOption = {
  label: string;
  value: string;
};

export type ColumnFilterConfig = {
  /**
   * Must match the TanStack column `id` / `accessorKey`.
   * - With `type`: renders a header filter button.
   * - Without `type` (options only): toolbar faceted filter only (legacy).
   */
  columnId: string;
  /**
   * Filter UI type. Required for header filter buttons.
   * Conditions are chosen automatically from this type (see DataTable docs).
   */
  type?: ColumnFilterType;
  options?: ColumnFilterOption[] | string[];
  /** Show min/max (or from/to) inputs; emits separate gte + lte FilterField objects */
  isRange?: boolean;
};

/** Active filters as a list of field/condition/value objects */
export type TableFiltersState = FilterField[];

export type SortDirectionValue = 'asc' | 'desc';

/** Sort field shape for server/client sorting */
export type SortField = {
  field: string;
  direction: SortDirectionValue;
};

/** Active sorts as a list of field/direction objects */
export type TableSortingState = SortField[];

/** Server pagination using limit / offset */
export type TablePaginationState = {
  limit: number;
  offset: number;
};

export type TableFilterProps = {
  filters?: ColumnFilterConfig[];
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
    /**
     * When true, shows applied filters as removable chips above the table.
     * Each chip has an × to clear that field; "Clear all" clears every filter.
     */
    showFilterChips?: boolean;
    /** Hide Checkbox  */
    hideSelection?: boolean;

    hideViewSelector?: boolean;
    placeholder?: string;
    /** Custom empty-state content when there are no rows. Defaults to labels.empty / "No data" */
    emptyState?: ReactNode;

    defaultRowCount?: 10 | 25 | 50 | 100;

    isCustomization?: boolean;
    paginationControls?: {
      goToFirstPage: () => void;
      goToPreviousPage: () => void;
      goToNextPage: () => void;
      goToLastPage: () => void;
    };
    /**
     * When true, filtering / sorting / pagination are treated as server-driven.
     * TanStack Table runs in manual mode and `onFiltersChange` / `onSortingChange` /
     * `onPaginationChange` are called so the parent can refetch.
     */
    withServer?: boolean;
    /** Initial / controlled filters when `withServer` is true */
    filterState?: TableFiltersState;
    /** Initial / controlled sorting when `withServer` is true */
    sortingState?: TableSortingState;
    /** Initial / controlled pagination when `withServer` is true */
    paginationState?: TablePaginationState;
    /** Fired when filters change (client or server) — always `FilterField[]` */
    onFiltersChange?(filters: TableFiltersState): void;
    /** Fired when sorting changes in server mode */
    onSortingChange?(sorting: TableSortingState): void;
    /** Fired when limit/offset pagination changes in server mode */
    onPaginationChange?(pagination: TablePaginationState): void;
    /** Total row count from the server (preferred for `withServer` page math) */
    totalRows?: number;
    /**
     * Legacy total **row** count used by customized / server footers
     * (`Math.ceil(totalPages / pageSize)`). Prefer `totalRows`.
     */
    totalPages?: number;
    args?: any;
    pageIdx?: number;
    pageSize?: number;
  };

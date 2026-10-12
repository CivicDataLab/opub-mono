import type { ReactNode } from 'react';
import type { RowData } from '@tanstack/table-core';

import { ActionListProps } from '../components/ActionList';
import type { ComplexAction } from './button';
import type { IconProps } from './icon';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Listed in the Columns menu and can be hidden. Hiding does not refetch. */
    optional?: boolean;
    /** Hide this column below the breakpoint while it stays visible in the menu. */
    responsive?: 'md' | 'lg';
  }
}

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
  /**
   * Column definitions.
   * Optional `size`, `minSize`, and `maxSize` are pixel widths.
   * `size` fixes that column. `minSize` alone is a floor and the column still grows with its content. `maxSize` alone is a ceiling.
   * Columns that omit these fields stay sized to their content.
   * `searchable` marks the column the toolbar search writes to. Only the first searchable column is used.
   * Search emits `{ field, condition: "icontains", value }`, the same shape as a text filter.
   */
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
   * Filter UI type.
   * Without the management chrome, a typed filter renders a header filter button.
   * With the management chrome, every typed filter is edited from the toolbar Filter button.
   * Conditions are chosen automatically from this type.
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

/** Column `meta` fields read by the management chrome. */
export type DataTableColumnMeta = {
  optional?: boolean;
  responsive?: 'md' | 'lg';
  /** Keep this column on one line and ellipsize overflow. */
  truncate?: boolean;
};

/** Status tab shown beside the automatic All tab. */
export type DataTableStatusOption = {
  key: string;
  label: string;
};

/**
 * Confirmation shown before a row action runs.
 * Same content and buttons as `AlertDialog`.
 * Omit `primaryAction` to confirm with the action label and its `destructive` flag.
 */
export type DataTableRowActionAlert = {
  title: ReactNode;
  children?: ReactNode;
  primaryAction?: ComplexAction;
  secondaryActions?: ComplexAction[];
  footer?: ReactNode;
};

/** Icon button rendered for one row. Replaces the shared `rowActions` kebab when set. */
export type DataTableRowAction = {
  key: string;
  /**
   * Icon component, or a React node when the icon needs its own color and stroke.
   * A node is rendered as given.
   */
  icon: IconProps['source'] | ReactNode;
  /** Icon color used when `icon` is a component. Defaults to critical when `destructive` is set. */
  color?: IconProps['color'];
  /** Stroke width used when `icon` is a component. Defaults to 2. */
  stroke?: IconProps['stroke'];
  /** Accessible name. A function is read on each render. */
  label: string | (() => string);
  onClick: () => void;
  /** Colors the icon red. Also makes the default confirm button critical. */
  destructive?: boolean;
  /** When set, the icon opens this alert instead of running `onClick` immediately. */
  alert?: DataTableRowActionAlert;
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
    /** Page title. Together with `statuses` or `onSearchChange`, shows the management chrome. */
    title?: string;
    /** Subtitle under the title. A function is called on each render. */
    subtitle?: string | (() => string);
    /** Label for the primary add button in the management header. */
    addLabel?: string;
    /** Called when the add button is pressed. */
    onAdd?: () => void;
    /**
     * Controlled search query.
     * When a column sets `searchable`, the query is also stored as that column's `icontains` filter.
     * Changing it in `withServer` mode resets pagination offset to 0.
     */
    searchState?: string;
    /**
     * Fired when the search query changes.
     * Waits 300ms after the last keystroke before the query and its filter are committed.
     */
    onSearchChange?(query: string): void;
    /**
     * Status tabs. An All tab is added automatically.
     * `'all'` is reserved and should not be used as a status key.
     */
    statuses?: DataTableStatusOption[];
    /** Active status tab. `'all'` or one of `statuses[].key`. */
    statusState?: string;
    /**
     * Fired when the status tab changes.
     * Changing it in `withServer` mode resets pagination offset to 0.
     */
    onStatusChange?(status: string): void;
    /**
     * Counts supplied by the server, including `all`.
     * The table only has the current page, so it cannot derive these.
     */
    statusCounts?: Record<string, number>;
    /**
     * Per-row icon actions. When set, the actions cell renders these buttons
     * instead of the shared `rowActions` kebab.
     */
    getRowActions?(row: any): DataTableRowAction[];
    /** Replaces the body with a loading skeleton. */
    loading?: boolean;
    /** Replaces the body with an error message and retry action. */
    loadError?: boolean;
    /** Called from the error row retry button. */
    onRetry?: () => void;
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

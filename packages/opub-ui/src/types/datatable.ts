export type SortDirection = 'asc' | 'desc' | 'none';
export type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';
export type ColumnContentType = 'text' | 'numeric';

export interface ColumnVisibilityData {
  leftEdge: number;
  rightEdge: number;
  isVisible?: boolean;
  width: number;
  index: number;
}

export interface DataTableState {
  condensed: boolean;
  columnVisibilityData: ColumnVisibilityData[];
  previousColumn?: ColumnVisibilityData;
  currentColumn?: ColumnVisibilityData;
  sortedColumnIndex?: number;
  sortDirection?: SortDirection;
  isScrolledFarthestLeft?: boolean;
  isScrolledFarthestRight?: boolean;
  rowHovered: number | undefined;
}

export interface DataTableProps {
  /** List of data types, which determines content alignment for each column. Data types are "text," which aligns left, or "numeric," which aligns right. */
  columnContentTypes: ColumnContentType[];
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
  /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
  sortable?: boolean;
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
  /** Header becomes sticky and pins to top of table when scrolling  */
  stickyHeader?: boolean;
}

export type IndexTableProps = DataTableProps & {
  /** Callback function to run on row selection  */
  onRowSelectionChange?(selectedRows: any): void;
  /** Default selected rows  */
  defaultSelectedRows?: any;
  /** Whether to enable the selection/deselection across page  */
  hasMoreItems?: boolean;
};

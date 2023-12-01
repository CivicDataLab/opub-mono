export type PillProps = {
  /** Content to display in the tag */
  children?: React.ReactNode;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when remove button is clicked or keypressed. */
  onRemove?(value: string): void;
  /** A string to use when tag has more than textual content */
  accessibilityLabel?: string;
  /** Variant of the tag */
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'critical';
  /** Value that is returned on click of remove button */
  returnValue?: string;
  /** Truncate text to one line */
  truncate?: boolean;
};

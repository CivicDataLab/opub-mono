interface NonMutuallyExclusiveProps {
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
}

export type PillProps = NonMutuallyExclusiveProps &
  (
    | { onClick?(): void; onRemove?: undefined; url?: undefined }
    | { onClick?: undefined; onRemove?(value: string): void; url?: string }
  );

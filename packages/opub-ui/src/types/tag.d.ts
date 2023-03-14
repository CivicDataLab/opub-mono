export interface NonMutuallyExclusiveProps {
  /** Content to display in the tag */
  children?: React.ReactNode;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when tag is clicked or keypressed. Renders without remove button or url when set. */
  onClick?(): void;
  /** Callback when remove button is clicked or keypressed. */
  onRemove?(): void;
  /** A string to use when tag has more than textual content */
  accessibilityLabel?: string;
  /** Url to navigate to when tag is clicked or keypressed. */
  url?: string;
  /** Url to navigate to when tag is clicked or keypressed. */
  color?: 'standard' | 'one' | 'two' | 'three' | 'four' | 'five';
}

export type TagProps = NonMutuallyExclusiveProps &
  (
    | { onClick?(): void; onRemove?: undefined; url?: undefined }
    | { onClick?: undefined; onRemove?(): void; url?: string }
  );

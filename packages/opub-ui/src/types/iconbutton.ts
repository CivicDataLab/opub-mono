import { IconSource } from './icon';

export type IconButtonProps = {
  /** Hidden Content to display inside the button. Required for accessibility */
  children: React.ReactNode;
  /** Icon to display to the left of the button content */
  icon: IconSource;
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: 'slim' | 'medium' | 'large';
  /** Whether to add a tooltip */
  withTooltip?: boolean;
  // Tooltip text
  tooltipText?: string;
  /** Disable the button */
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

import { Color, IconSource } from './icon';
import { TablerIconsProps } from '@tabler/icons-react';

export type IconButtonProps = {
  /** Hidden Content to display inside the button. Required for accessibility */
  children: React.ReactNode;
  /** Icon to display to the left of the button content */
  icon: any;
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
  /** Color of the icon */
  color?: Color;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

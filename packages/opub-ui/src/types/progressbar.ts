import * as Progress from '@radix-ui/react-progress';

export type ProgressBarProps = {
  /* The progression of certain tasks  */
  value: number;
  /* The progression of certain tasks  */
  max?: number;
  /* A function to get the accessible label text representing the current value */
  getValueLabel?(value: number, max: number): string;
  /**
   * Size of progressbar
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Color of progressbar
   * @default 'highlight'
   */
  color?: 'highlight' | 'primary' | 'success' | 'critical';
  /**
   * Whether the fill animation is triggered
   * @default true
   */
  animated?: boolean;
  /**
   * Id (ids) of element (elements) that describes progressbar
   */
  ariaLabelledBy?: string;
} & Progress.ProgressProps;

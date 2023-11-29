import { TablerIconsProps } from '@tabler/icons-react';

export type Color =
  | 'default'
  | 'subdued'
  | 'disabled'
  | 'critical'
  | 'warning'
  | 'success'
  | 'highlight'
  | 'interactive'
  | 'onBgDefault'
  | 'onBgSubdued'
  | 'onBgDisabled';

export type IconSource =
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  | 'placeholder'
  | string
  | ((props: TablerIconsProps) => React.ReactElement)
  | TablerIconsProps
  | React.SVGProps<SVGSVGElement>;

export interface IconProps {
  /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
  source: IconSource;
  /** Set the color for the SVG fill */
  color?: Color;
  /** Show a backdrop behind the icon */
  backdrop?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
  /** size of the icon, use space tokens  */
  size?: number;
  /** stroke width  */
  stroke?: number;
  /** class name  */
  className?: string;
  /** Prevent click event */
  noEvents?: boolean;
}

import { ReactNode } from 'react';

type Element =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'legend';

type Variant =
  | 'headingXs'
  | 'headingSm'
  | 'headingMd'
  | 'headingLg'
  | 'headingXl'
  | 'heading2xl'
  | 'heading3xl'
  | 'heading4xl'
  | 'bodySm'
  | 'bodyMd'
  | 'bodyLg';

type Alignment = 'start' | 'center' | 'end' | 'justify';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type Color =
  | 'success'
  | 'critical'
  | 'warning'
  | 'subdued'
  | 'text-inverse'
  | 'disabled'
  | 'default'
  | 'inherit';

export const VariantFontWeightMapping: { [V in Variant]: FontWeight } = {
  headingXs: 'semibold',
  headingSm: 'semibold',
  headingMd: 'semibold',
  headingLg: 'semibold',
  headingXl: 'semibold',
  heading2xl: 'semibold',
  heading3xl: 'semibold',
  heading4xl: 'bold',
  bodySm: 'regular',
  bodyMd: 'regular',
  bodyLg: 'regular',
};

export interface TextProps {
  /** Adjust horizontal alignment of text */
  alignment?: Alignment;
  /** The element type */
  as?: Element;
  /** Prevent text from overflowing */
  breakWord?: boolean;
  /** Prevent text from breaking */
  noBreak?: boolean;
  /** Text to display */
  children: ReactNode;
  /** Adjust color of text */
  color?: Color;
  /** Adjust weight of text */
  fontWeight?: FontWeight;
  /** HTML id attribute */
  id?: string;
  /** Use a numeric font variant with monospace appearance */
  numeric?: boolean;
  /** Truncate text overflow with ellipsis */
  truncate?: boolean;
  /** Typographic style of text */
  variant?: Variant;
  /** Visually hide the text */
  visuallyHidden?: boolean;
  /** Custom class name */
  className?: string;
}

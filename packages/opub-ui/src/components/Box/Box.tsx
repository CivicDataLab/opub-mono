import React, { createElement, forwardRef } from 'react';

import cx from 'classnames';
import {
  getResponsiveProps,
  ResponsiveProp,
  sanitizeCustomProperties,
} from '../../utils/css';
import styles from './Box.module.scss';

import {
  ColorsActionTokenAlias,
  ColorsBackdropTokenAlias,
  ColorsBackgroundTokenAlias,
  ColorsOverlayTokenAlias,
  ColorsSurfaceTokenAlias,
  DepthShadowAlias,
  ShapeBorderWidthScale,
  SpacingSpaceScale,
} from '@ui/tokens';

type Element = 'div' | 'span' | 'section' | 'legend' | 'ul' | 'li';

type Overflow = 'hidden' | 'scroll';
type Position = 'relative' | 'absolute' | 'fixed' | 'sticky';

export type ColorTokenScale =
  | 'text'
  | 'text-critical'
  | 'text-disabled'
  | 'text-highlight'
  | 'text-on-critical'
  | 'text-on-dark'
  | 'text-on-interactive'
  | 'text-on-primary'
  | 'text-primary'
  | 'text-primary-hovered'
  | 'text-primary-pressed'
  | 'text-subdued'
  | 'text-subdued-on-dark'
  | 'text-success'
  | 'text-warning';

export type BorderTokenAlias =
  | 'base'
  | 'dark'
  | 'divider'
  | 'divider-on-dark'
  | 'transparent';

type Spacing = ResponsiveProp<SpacingSpaceScale>;

export type BorderRadiusTokenScale =
  | '05'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | 'full';

export type BackgroundColors =
  | ColorsBackdropTokenAlias
  | ColorsBackgroundTokenAlias
  | ColorsOverlayTokenAlias
  | ColorsActionTokenAlias
  | ColorsSurfaceTokenAlias;

export interface BoxProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Background color */
  background?: BackgroundColors;
  /** Border style */
  border?: BorderTokenAlias;
  /** Vertical end border style */
  borderBlockEnd?: BorderTokenAlias;
  /** Horizontal start border style */
  borderInlineStart?: BorderTokenAlias;
  /** Horizontal end border style */
  borderInlineEnd?: BorderTokenAlias;
  /** Vertical start border style */
  borderBlockStart?: BorderTokenAlias;
  /** Border radius */
  borderRadius?: BorderRadiusTokenScale;
  /** Vertical end horizontal start border radius */
  borderRadiusEndStart?: BorderRadiusTokenScale;
  /** Vertical end horizontal end border radius */
  borderRadiusEndEnd?: BorderRadiusTokenScale;
  /** Vertical start horizontal start border radius */
  borderRadiusStartStart?: BorderRadiusTokenScale;
  /** Vertical start horizontal end border radius */
  borderRadiusStartEnd?: BorderRadiusTokenScale;
  /** Border width */
  borderWidth?: ShapeBorderWidthScale;
  /** Vertical start border width */
  borderBlockStartWidth?: ShapeBorderWidthScale;
  /** Vertical end border width */
  borderBlockEndWidth?: ShapeBorderWidthScale;
  /** Horizontal start border width */
  borderInlineStartWidth?: ShapeBorderWidthScale;
  /** Horizontal end border width */
  borderInlineEndWidth?: ShapeBorderWidthScale;
  /** Color of children */
  color?: ColorTokenScale;
  /** HTML id attribute */
  id?: string;
  /** Minimum height of container */
  minHeight?: string;
  /** Minimum width of container */
  minWidth?: string;
  /** Maximum width of container */
  maxWidth?: string;
  /** Clip horizontal content of children */
  overflowX?: Overflow;
  /** Clip vertical content of children */
  overflowY?: Overflow;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: Spacing;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockStart='4'
   * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockStart?: Spacing;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockEnd='4'
   * paddingBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockEnd?: Spacing;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineStart='4'
   * paddingInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineStart?: Spacing;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineEnd='4'
   * paddingInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineEnd?: Spacing;
  /** Aria role */
  role?: Extract<
    React.AriaRole,
    'status' | 'presentation' | 'menu' | 'listbox' | 'combobox'
  >;
  /** Shadow on box */
  shadow?: DepthShadowAlias;
  /** Set tab order */
  tabIndex?: Extract<React.AllHTMLAttributes<HTMLElement>['tabIndex'], number>;
  /** Width of container */
  width?: string;
  // These could be moved to new layout component(s) in the future
  /** Position of box */
  position?: Position;
  /** Top position of box */
  insetBlockStart?: Spacing;
  /** Bottom position of box */
  insetBlockEnd?: Spacing;
  /** Left position of box */
  insetInlineStart?: Spacing;
  /** Right position of box */
  insetInlineEnd?: Spacing;
  /** Opacity of box */
  opacity?: string;
  /** Outline style */
  outline?: BorderTokenAlias;
  /** Visually hide the contents during print */
  printHidden?: boolean;
  /** Visually hide the contents (still announced by screenreader) */
  visuallyHidden?: boolean;
  /** z-index of box */
  zIndex?: string;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as = 'div',
      background,
      border,
      borderBlockEnd,
      borderInlineStart,
      borderInlineEnd,
      borderBlockStart,
      borderWidth,
      borderBlockStartWidth,
      borderBlockEndWidth,
      borderInlineStartWidth,
      borderInlineEndWidth,
      borderRadius,
      borderRadiusEndStart,
      borderRadiusEndEnd,
      borderRadiusStartStart,
      borderRadiusStartEnd,
      children,
      color,
      id,
      minHeight,
      minWidth,
      maxWidth,
      overflowX,
      overflowY,
      outline,
      padding,
      paddingBlockStart,
      paddingBlockEnd,
      paddingInlineStart,
      paddingInlineEnd,
      role,
      shadow,
      tabIndex,
      width,
      printHidden,
      visuallyHidden,
      position,
      insetBlockStart,
      insetBlockEnd,
      insetInlineStart,
      insetInlineEnd,
      zIndex,
      opacity,
      ...restProps
    },
    ref
  ) => {
    const style = {
      '--op-box-color': color ? `var(--${color})` : undefined,
      '--op-box-background': background ? `var(--${background})` : undefined,
      '--op-box-border': border ? `var(--border-${border})` : undefined,
      '--op-box-border-block-end': borderBlockEnd
        ? `var(--border-${borderBlockEnd})`
        : undefined,
      '--op-box-border-inline-start': borderInlineStart
        ? `var(--border-${borderInlineStart})`
        : undefined,
      '--op-box-border-inline-end': borderInlineEnd
        ? `var(--border-${borderInlineEnd})`
        : undefined,
      '--op-box-border-block-start': borderBlockStart
        ? `var(--border-${borderBlockStart})`
        : undefined,
      '--op-box-border-radius': borderRadius
        ? `var(--border-radius-${borderRadius})`
        : undefined,
      '--op-box-border-radius-end-start': borderRadiusEndStart
        ? `var(--border-radius-${borderRadiusEndStart})`
        : undefined,
      '--op-box-border-radius-end-end': borderRadiusEndEnd
        ? `var(--border-radius-${borderRadiusEndEnd})`
        : undefined,
      '--op-box-border-radius-start-start': borderRadiusStartStart
        ? `var(--border-radius-${borderRadiusStartStart})`
        : undefined,
      '--op-box-border-radius-start-end': borderRadiusStartEnd
        ? `var(--border-radius-${borderRadiusStartEnd})`
        : undefined,
      '--op-box-border-width': borderWidth
        ? `var(--border-width-${borderWidth})`
        : undefined,
      '--op-box-border-block-start-width': borderBlockStartWidth
        ? `var(--border-width-${borderBlockStartWidth})`
        : undefined,
      '--op-box-border-block-end-width': borderBlockEndWidth
        ? `var(--border-width-${borderBlockEndWidth})`
        : undefined,
      '--op-box-border-inline-start-width': borderInlineStartWidth
        ? `var(--border-width-${borderInlineStartWidth})`
        : undefined,
      '--op-box-border-inline-end-width': borderInlineEndWidth
        ? `var(--border-width-${borderInlineEndWidth})`
        : undefined,
      '--op-box-min-height': minHeight,
      '--op-box-min-width': minWidth,
      '--op-box-max-width': maxWidth,
      '--op-box-outline': outline ? `var(--border-${outline})` : undefined,
      '--op-box-overflow-x': overflowX,
      '--op-box-overflow-y': overflowY,
      ...getResponsiveProps(
        'box',
        'padding-block-end',
        'space',
        paddingBlockEnd || padding
      ),
      ...getResponsiveProps(
        'box',
        'padding-block-start',
        'space',
        paddingBlockStart || padding
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-start',
        'space',
        paddingInlineStart || padding
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-end',
        'space',
        paddingInlineEnd || padding
      ),
      '--op-box-shadow': shadow ? `var(--shadow-${shadow})` : undefined,
      '--op-box-width': width,
      position,
      '--op-box-inset-block-start': insetBlockStart
        ? `var(--space-${insetBlockStart})`
        : undefined,
      '--op-box-inset-block-end': insetBlockEnd
        ? `var(--space-${insetBlockEnd})`
        : undefined,
      '--op-box-inset-inline-start': insetInlineStart
        ? `var(--space-${insetInlineStart})`
        : undefined,
      '--op-box-inset-inline-end': insetInlineEnd
        ? `var(--space-${insetInlineEnd})`
        : undefined,
      zIndex,
      opacity,
    } as React.CSSProperties;

    const className = cx(
      styles.Box,
      visuallyHidden && styles.visuallyHidden,
      printHidden && styles.printHidden,
      as === 'ul' && styles.listReset
    );

    return createElement(
      as,
      {
        className,
        id,
        ref,
        style: sanitizeCustomProperties(style),
        role,
        tabIndex,
        ...restProps,
      },
      children
    );
  }
);

Box.displayName = 'Box';

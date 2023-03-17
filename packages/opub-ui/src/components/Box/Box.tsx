import React, { createElement, forwardRef } from 'react';

import { BoxProps } from '@ui/types/box';
import cx from 'classnames';
import { getResponsiveProps, sanitizeCustomProperties } from '../../utils/css';
import styles from './Box.module.scss';

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

import { filterDOMProps } from '@react-aria/utils';
import Utils from '@react-spectrum/utils';
import { DOMProps } from '../../types/shared/dom';
import { DOMRef } from '../../types/shared/refs';
import { FlexStyleProps } from '../../types/shared/style';
import React from 'react';
import styles from './Flex.module.scss';
import clsx from 'classnames';

export interface FlexProps extends DOMProps, FlexStyleProps {
  /** Children of the flex container. */
  children: React.ReactNode;
  /** Class names of the flex container. */
  className?: string;
}

const flexStyleProps: Utils.StyleHandlers = {
  direction: ['flexDirection', Utils.passthroughStyle],
  wrap: ['flexWrap', flexWrapValue],
  justifyContent: ['justifyContent', flexAlignValue],
  alignItems: ['alignItems', flexAlignValue],
  alignContent: ['alignContent', flexAlignValue],
};

const Flex = React.forwardRef(
  (props: FlexProps, ref: DOMRef<HTMLDivElement>) => {
    let { children, ...otherProps }: any = props;
    let { styleProps } = Utils.useStyleProps(otherProps);
    let { styleProps: flexStyle } = Utils.useStyleProps(
      otherProps,
      flexStyleProps
    );
    let domRef = Utils.useDOMRef(ref);

    let style = {
      ...styleProps.style,
      ...flexStyle.style,
    };
    return (
      <div
        {...filterDOMProps(otherProps)}
        className={
          props.className
            ? props.className
            : '' + clsx(styles, 'flex', styleProps.className)
        }
        style={{ display: 'flex', gap: otherProps.gap || '0px', ...style }}
        ref={domRef}
      >
        {children}
      </div>
    );
  }
);

export { Flex };

/**
 * Normalize 'start' and 'end' alignment values to 'flex-start' and 'flex-end'
 * in flex containers for browser compatibility.
 */
function flexAlignValue(value: any) {
  if (value === 'start') {
    return 'flex-start';
  }

  if (value === 'end') {
    return 'flex-end';
  }

  return value;
}

/**
 * Takes a boolean and translates it to flex wrap or nowrap.
 */
function flexWrapValue(value: any) {
  if (typeof value === 'boolean') {
    return value ? 'wrap' : 'nowrap';
  }

  return value;
}

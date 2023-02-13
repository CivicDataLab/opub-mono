import { filterDOMProps } from '@react-aria/utils';
import {
  classNames,
  passthroughStyle,
  StyleHandlers,
  useDOMRef,
  useStyleProps,
} from '@react-spectrum/utils';
import { DOMProps, DOMRef, FlexStyleProps } from '@react-types/shared';
import React from 'react';
import styles from './Flex.module.scss';

export interface FlexProps extends DOMProps, FlexStyleProps {
  /** Children of the flex container. */
  children: React.ReactNode;
}

const flexStyleProps: StyleHandlers = {
  direction: ['flexDirection', passthroughStyle],
  wrap: ['flexWrap', flexWrapValue],
  justifyContent: ['justifyContent', flexAlignValue],
  alignItems: ['alignItems', flexAlignValue],
  alignContent: ['alignContent', flexAlignValue],
};

const Flex = React.forwardRef(
  (props: FlexProps, ref: DOMRef<HTMLDivElement>) => {
    let { children, ...otherProps }: any = props;
    let { styleProps } = useStyleProps(otherProps);
    let { styleProps: flexStyle } = useStyleProps(otherProps, flexStyleProps);
    let domRef = useDOMRef(ref);

    let style = {
      ...styleProps.style,
      ...flexStyle.style,
    };
    return (
      <div
        {...filterDOMProps(otherProps)}
        className={classNames(styles, 'flex', styleProps.className)}
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

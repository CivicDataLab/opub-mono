import cx from 'classnames';
import React, { LegacyRef } from 'react';
import { DOMProps } from '../../types/shared/dom';
import { FlexStyleProps } from '../../types/shared/style';
import styles from './Flex.module.scss';
export interface FlexProps extends DOMProps, FlexStyleProps {
  /** Children of the flex container. */
  children: React.ReactNode;
  /** Class names of the flex container. */
  className?: string;
}

const flexStyleProps: any = {
  direction: ['flexDirection', (e: string) => e],
  wrap: ['flexWrap', flexWrapValue],
  justifyContent: ['justifyContent', flexAlignValue],
  alignItems: ['alignItems', flexAlignValue],
  alignContent: ['alignContent', flexAlignValue],
};

const Flex = React.forwardRef(
  (props: FlexProps, ref: LegacyRef<HTMLDivElement>) => {
    let { children, ...otherProps }: any = props;
    let { styleProps: flexStyle } = useStyleProps(otherProps, flexStyleProps);

    let style = {
      ...flexStyle,
    };
    return (
      <div
        {...filterDOMProps(otherProps)}
        className={props.className ? props.className : '' + cx(styles, 'flex')}
        style={{ display: 'flex', gap: otherProps.gap || '0px', ...style }}
        ref={ref}
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

function useStyleProps(otherProps: any, flexStyleProps: any) {
  const styleProps: any = {};
  Object.keys(otherProps).map((styleKey) => {
    if (flexStyleProps[styleKey]) {
      styleProps[flexStyleProps[styleKey][0]] = flexStyleProps[styleKey][1](
        otherProps[styleKey]
      );
    } else {
      styleProps[styleKey] = otherProps[styleKey];
    }
  });

  return {
    styleProps,
  };
}

function filterDOMProps(props: any, opts: any = {}) {
  let { labelable: labelable, propNames: propNames } = opts;
  let filteredProps: any = {};
  for (const prop in props)
    if (
      Object.prototype.hasOwnProperty.call(props, prop) &&
      (DOMPropNames.has(prop) ||
        (labelable && labelablePropNames.has(prop)) ||
        (propNames === null || propNames === void 0
          ? void 0
          : propNames.has(prop)) ||
        propRe.test(prop))
    )
      filteredProps[prop] = props[prop];
  return filteredProps;
}

const DOMPropNames = new Set(['id']);

const labelablePropNames = new Set([
  'aria-label',
  'aria-labelledby',
  'aria-describedby',
  'aria-details',
]);
const propRe = /^(data-.*)$/;

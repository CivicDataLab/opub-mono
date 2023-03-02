import { filterDOMProps } from '@react-aria/utils';
import {
  ClearSlots,
  useDOMRef,
  useSlotProps,
  useStyleProps,
  viewStyleProps,
} from '@react-spectrum/utils';
import { DOMRef } from '@react-types/shared';
import { ViewProps } from '@ui/types/view';
import React from 'react';

export const View = React.forwardRef((props: ViewProps, ref: DOMRef) => {
  props = useSlotProps(props);
  let { elementType: ElementType = 'div', children, ...otherProps } = props;
  let { styleProps } = useStyleProps(props, viewStyleProps);
  let domRef = useDOMRef(ref);

  return (
    <ElementType {...filterDOMProps(otherProps)} {...styleProps} ref={domRef}>
      <ClearSlots>{children}</ClearSlots>
    </ElementType>
  );
});

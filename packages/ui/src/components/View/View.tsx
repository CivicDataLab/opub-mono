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
import { ReactElement, forwardRef } from 'react';

function View(props: ViewProps, ref: DOMRef) {
  props = useSlotProps(props);
  let { elementType: ElementType = 'div', children, ...otherProps } = props;
  let { styleProps } = useStyleProps(props, viewStyleProps);
  let domRef = useDOMRef(ref);

  return (
    <ElementType {...filterDOMProps(otherProps)} {...styleProps} ref={domRef}>
      <ClearSlots>{children}</ClearSlots>
    </ElementType>
  );
}

/**
 * View is a general purpose container with no specific semantics that can be used for custom styling purposes.
 * It supports Spectrum style props to ensure consistency with other Spectrum components.
 */
const _View = forwardRef(View) as (
  props: ViewProps & { ref?: DOMRef }
) => ReactElement;
export { _View as View };

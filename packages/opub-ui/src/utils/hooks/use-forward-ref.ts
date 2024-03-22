import React from 'react';

/**
 * Creates a mutable ref object whose current property is initialized to the passed argument.
 * The return value persists for the full lifetime of the component.
 *
 * @param {React.ForwardedRef<T>} ref - The ref to be forwarded.
 * @param {any} initialValue - The initial value of the ref.
 * @return {React.MutableRefObject<T>} A mutable ref object whose current property is initialized to the passed argument.
 */
export const useForwardRef = <T>(
  ref: React.ForwardedRef<T>,
  initialValue: any = null
) => {
  const targetRef = React.useRef<T>(initialValue);

  React.useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};

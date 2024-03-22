import * as React from 'react';

/**
 * A React Hook that locks the body scroll by setting the overflow style to 'hidden'.
 *
 * The hook uses `useLayoutEffect` to change the body's overflow style to 'hidden' when the component mounts, effectively locking the body scroll.
 * When the component unmounts, the hook restores the original overflow style, unlocking the body scroll.
 *
 * @example
 * // In a component...
 * useLockBody();
 * // The body scroll is now locked. It will be unlocked when the component unmounts.
 */ export function useLockBody() {
  React.useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalStyle);
  }, []);
}

import React from 'react';

/**
 * A React Hook that tracks if the component is currently mounted.
 *
 * The hook uses `useState` to create a `mounted` state variable, initially set to `false`.
 * It then uses `useEffect` to set `mounted` to `true` when the component mounts.
 *
 * @return {boolean} A state value indicating whether the component is currently mounted.
 *
 * @example
 * // In a component...
 * const isMounted = useMounted();
 * // `isMounted` is true if the component is currently mounted, false otherwise.
 */

export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

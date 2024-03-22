'use client';

import { useCallback, useState } from 'react';

/**
 * A React Hook that provides a boolean state value and functions to toggle it, set it to true, and set it to false.
 *
 * The hook uses `useState` to create a `value` state variable, initially set to the provided `initialState`.
 * It also provides three functions: `toggle` (which toggles the `value`), `setTrue` (which sets `value` to true), and `setFalse` (which sets `value` to false).
 * These functions are wrapped in `useCallback` to prevent unnecessary re-renders.
 *
 * @param {boolean} initialState - The initial state value.
 * @return {object} An object containing the `value` state value and the `toggle`, `setTrue`, and `setFalse` functions.
 *
 * @example
 * // In a component...
 * const { value, toggle, setTrue, setFalse } = useToggle(false);
 * // `value` is the current state value
 * // `toggle` is a function that toggles the state value
 * // `setTrue` is a function that sets the state value to true
 * // `setFalse` is a function that sets the state value to false
 */
export function useToggle(initialState: boolean): {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
} {
  const [value, setState] = useState(initialState);

  return {
    value,
    toggle: useCallback(() => setState((state) => !state), []),
    setTrue: useCallback(() => setState(true), []),
    setFalse: useCallback(() => setState(false), []),
  };
}

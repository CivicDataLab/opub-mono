'use client';

import { useCallback } from 'react';

/**
 * useDisableClick provides the original event handler but disables interaction
 * if the boolean passed is true.
 * @param disabled - A boolean value that determines if the button should
 * be disabled
 * @param handleEvent - The original event handler
 * @returns Function - The original event handler but with interactions disabled if the
 * provided boolean is true
 * @example
 * function ComponentExample() {
 * const handleClick = () => {
 *  console.log('disable me');
 * };
 * const handleClickEvent = useDisableInteraction(true, handleClick);
 * return <button onClick={handleClickEvent}>Im Disabled</button>;
 * }
 */

export function useDisableClick(
  disabled?: boolean,
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
) {
  const handleClickWrapper = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [disabled]
  );

  if (!disabled) {
    return handleClick;
  }

  return handleClickWrapper;
}

export function useDisableKeyboard(
  disabled?: boolean,
  handleKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
) {
  const handleKeyDownWrapper = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled && (event?.key === ' ' || event.key === 'Enter')) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [disabled]
  );

  if (!disabled) {
    return handleKeyDown;
  }

  return handleKeyDownWrapper;
}

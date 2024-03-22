import React, { useState } from 'react';

/**
 * A custom React Hook that listens for a specific key press and triggers a function when the key is pressed.
 * On Mac, it listens for the Meta key (Command ⌘) and on other platforms, it listens for the Control key.
 *
 * @param {string} targetKey - The specific key to listen for.
 * @param {() => void} [fn] - The function to execute when the target key is pressed. Optional.
 * @return {boolean} A state value indicating whether the target key is currently pressed.
 *
 * @example
 * // Listen for 's' key press and log a message when it's pressed with the Meta/Control key
 * useMetaKeyPress('s', () => console.log('Save command triggered'));
 */
export function useMetaKeyPress(targetKey: string, fn?: () => void): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.indexOf('Mac') !== -1;

      if (isMac) {
        if (e.key === targetKey && e.metaKey) {
          e.preventDefault();
          fn && fn();
          setKeyPressed((e) => !e);
        }
      } else {
        if (e.key === targetKey && e.ctrlKey) {
          e.preventDefault();
          fn && fn();
          setKeyPressed((e) => !e);
        }
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [targetKey, fn]);

  return keyPressed;
}

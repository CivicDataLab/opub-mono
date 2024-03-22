import { useEffect, useState } from 'react';

/**
 * A custom React Hook that listens for a key press event and returns the key pressed.
 *
 * The hook listens for the 'keydown' event on the window object. When a key is pressed, it updates the state with the key pressed.
 * The state is cleared after 1 millisecond.
 *
 * @return {object} An object with one property: `key` (the key that was pressed).
 *
 * @example
 * // In a component...
 * const { key } = useKeyDetect();
 * // `key` is the key that was pressed
 */
export function useKeyDetect(): { key: string } {
  const [keyPressed, setKeyPressed] = useState<{
    key: string;
  }>({
    key: '',
  });
  function downHandler({ key }: { key: string; metaKey?: boolean }): void {
    setKeyPressed({ key });

    // clear key after 1 milisecond
    setTimeout(() => {
      setKeyPressed({ key: '' });
    }, 1);
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return { key: keyPressed.key };
}

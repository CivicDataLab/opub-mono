import { useEffect, useState } from 'react';

// Define general type for useWindowSize hook, which includes width and height
export interface Size {
  width: number | undefined;
  height: number | undefined;
}

/**
 * A custom React Hook that provides the current window size.
 *
 * The hook uses `useState` to create a `windowSize` state variable, initially set to an object with `width` and `height` both undefined.
 * It then uses `useEffect` to add a 'resize' event listener to the window when the component mounts. This event listener updates `windowSize` with the current window size whenever the window is resized.
 * The initial window size is set by calling the event handler immediately after adding the event listener.
 * The event listener is removed when the component unmounts.
 *
 * @return {Size} An object containing the current window width and height.
 *
 * @example
 * // In a component...
 * const { width, height } = useWindowSize();
 * // `width` and `height` are the current window width and height, respectively.
 */
export function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

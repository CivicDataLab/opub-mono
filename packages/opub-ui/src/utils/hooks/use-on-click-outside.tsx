import React from 'react';

/**
 * A React Hook that triggers a handler function when a click event occurs outside of the specified element.
 *
 * The hook uses `useEffect` to add a click event listener to the document when the component mounts.
 * The event listener checks if the click event occurred inside the specified element. If it did not, it calls the handler function.
 * When the component unmounts, the hook removes the event listener.
 *
 * @param {React.RefObject<HTMLElement>} ref - A ref object representing the element to detect clicks outside of.
 * @param {(event: MouseEvent | TouchEvent) => void} handler - The function to execute when a click event occurs outside the specified element.
 *
 * @example
 * // In a component...
 * const ref = useRef(null);
 * useOnClickOutside(ref, () => console.log('Clicked outside'));
 */
export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}

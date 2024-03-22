import React from 'react';

/**
 * A React Hook that determines if the current user's operating system is macOS.
 *
 * This is determined by checking the user agent string for the presence of 'Mac'.
 *
 * @return {boolean} A state value indicating whether the current user's operating system is macOS.
 *
 * @example
 * // returns true if the user's operating system is macOS
 * // returns false otherwise
 * const isMacOS = useIsMac();
 */
export const useIsMac = (): boolean => {
  const [isMac, setIsMac] = React.useState(false);
  React.useEffect(() => {
    setIsMac(window.navigator.userAgent.includes('Mac'));
  }, []);
  return isMac;
};

/**
 * Determines if the current environment is a server environment.
 *
 * This is determined by checking if the `window` or `document` objects are undefined.
 * In a server environment, such as Node.js, these objects are not present.
 *
 * @constant
 * @type {boolean}
 * @example
 * // returns true in a Node.js environment
 * // returns false in a browser environment
 * const serverCheck = isServer;
 */
export const isServer =
  typeof window === 'undefined' || typeof document === 'undefined';

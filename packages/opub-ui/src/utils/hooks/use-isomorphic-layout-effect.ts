'use client';

import { useEffect, useLayoutEffect } from 'react';

import { isServer } from '../target';

/**
 * A custom hook that uses `useLayoutEffect` on the client and `useEffect` on the server.
 *
 * This is useful for avoiding warnings about `useLayoutEffect` not working on the server,
 * while still getting the benefits of `useLayoutEffect` when running on the client.
 *
 * @example
 * // In a component...
 * useIsomorphicLayoutEffect(() => {
 *   // Your effect here...
 * });
 */
export const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;

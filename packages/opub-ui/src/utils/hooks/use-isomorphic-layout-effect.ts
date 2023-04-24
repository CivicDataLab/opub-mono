'use client';

import { isServer } from '../target';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;

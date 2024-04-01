import { useCallback, useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

import type { Key } from '../../types/shared/key';

export interface NonMutuallyExclusiveProps {
  keyCode: Key;
  handler(event: KeyboardEvent): void;
  keyEvent?: KeyEvent;
}

export type KeypressListenerProps = NonMutuallyExclusiveProps &
  (
    | { useCapture?: boolean; options?: undefined }
    | { useCapture?: undefined; options?: AddEventListenerOptions }
  );

type KeyEvent = 'keydown' | 'keyup';

export function KeypressListener({
  keyCode,
  handler,
  keyEvent = 'keyup',
  options,
  useCapture,
}: KeypressListenerProps) {
  const tracked = useRef({ handler, keyCode });

  useIsomorphicLayoutEffect(() => {
    tracked.current = { handler, keyCode };
  }, [handler, keyCode]);

  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    const { handler, keyCode } = tracked.current;
    if (event.code === keyCode) {
      handler(event);
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener(keyEvent, handleKeyEvent, useCapture || options);
    return () => {
      document.removeEventListener(
        keyEvent,
        handleKeyEvent,
        useCapture || options
      );
    };
  }, [keyEvent, handleKeyEvent, useCapture, options]);

  return null;
}

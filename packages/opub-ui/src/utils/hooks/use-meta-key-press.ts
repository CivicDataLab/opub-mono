import React, { useState } from 'react';

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

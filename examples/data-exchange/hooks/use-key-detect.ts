import { useEffect, useState } from 'react';

export function useKeyDetect(): { key: string; metaKey?: boolean } {
  const [keyPressed, setKeyPressed] = useState<{
    key: string;
    metaKey?: boolean;
  }>({
    key: '',
    metaKey: false,
  });
  function downHandler({
    key,
    metaKey,
  }: {
    key: string;
    metaKey?: boolean;
  }): void {
    setKeyPressed({ key, metaKey });

    // clear key after 1 milisecond
    setTimeout(() => {
      setKeyPressed({ key: '', metaKey: false });
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
  return { key: keyPressed.key, metaKey: keyPressed.metaKey };
}

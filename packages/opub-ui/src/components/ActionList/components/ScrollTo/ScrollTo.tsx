import React, { useContext, useEffect, useId, useRef } from 'react';

import { ScrollableContext } from './context';

export function ScrollTo() {
  const anchorNode = useRef<HTMLAnchorElement>(null);
  const scrollToPosition = useContext(ScrollableContext);

  useEffect(() => {
    if (!scrollToPosition || !anchorNode.current) {
      return;
    }

    scrollToPosition(anchorNode.current.offsetTop);
  }, [scrollToPosition]);

  const id = useId();
  return <a id={id} ref={anchorNode} />;
}

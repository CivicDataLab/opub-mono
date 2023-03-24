import React, { forwardRef } from 'react';
import styles from './ScrollArea.module.scss';
import cx from 'classnames';
import * as Scroll from '@radix-ui/react-scroll-area';

type Props = {
  children: React.ReactNode;
};

const ScrollArea = forwardRef((props: Props, ref: any) => {
  const { children, ...others } = props;
  const themeClass = cx(styles.ScrollArea, {});

  return (
    <div className={`opub-ScrollArea ${themeClass}`} ref={ref} {...others}>
      <Scroll.Root className={styles.ScrollAreaRoot}>
        <Scroll.Viewport className={styles.ScrollAreaViewport}>
          {children}
        </Scroll.Viewport>
        <Scroll.Scrollbar
          forceMount
          className={styles.ScrollAreaScrollbar}
          orientation="vertical"
        >
          <Scroll.Thumb className={styles.ScrollAreaThumb} />
        </Scroll.Scrollbar>
        <Scroll.Scrollbar
          forceMount
          className={styles.ScrollAreaScrollbar}
          orientation="horizontal"
        >
          <Scroll.Thumb className={styles.ScrollAreaThumb} />
        </Scroll.Scrollbar>
        <Scroll.Corner className={styles.ScrollAreaCorner} />
      </Scroll.Root>
    </div>
  );
});

export { ScrollArea };

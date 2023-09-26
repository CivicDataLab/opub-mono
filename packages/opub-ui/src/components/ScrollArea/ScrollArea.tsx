import styles from './ScrollArea.module.scss';
import * as Scroll from '@radix-ui/react-scroll-area';
import cx from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
};

const ScrollArea = forwardRef((props: Props, ref: any) => {
  const { children, ...others } = props;
  const themeClass = cx(styles.ScrollArea, {});

  return (
    <>
      <Scroll.Root className={styles.ScrollAreaRoot} ref={ref} {...others}>
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
    </>
  );
});

export { ScrollArea };

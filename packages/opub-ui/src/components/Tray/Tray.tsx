import { ScrollArea } from '../ScrollArea';
import { Sheet } from '../Sheet';
import { Text } from '../Text';
import styles from './Tray.module.scss';
import cx from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
  // content for the tray
  children: React.ReactNode;
  // whether the tray is open
  open: boolean;
  // called when the tray should be closed
  onOpenChange: (open: boolean) => void;
  // optional class name
  className?: string;
  // hide the overlay
  hideOverlay?: boolean;
  // size of the tray
  size?: 'narrow' | 'medium' | 'extended';
};

const Tray = forwardRef((props: Props, ref: any) => {
  const {
    children,
    open,
    onOpenChange,
    className,
    hideOverlay,
    size = 'medium',
  } = props;
  const themeClass = cx(styles.Tray, className);

  return (
    <>
      {open && !hideOverlay && (
        <div
          className={styles.Overlay}
          data-aria-hidden="true"
          aria-hidden="true"
        />
      )}
      <Sheet
        onOpenChange={() => onOpenChange(false)}
        isOpen={open}
        side="bottom"
        ref={ref}
        className={themeClass}
        size={size}
      >
        <button className={styles.Bar} onClick={() => onOpenChange(false)}>
          <Text visuallyHidden>close tray</Text>
          <div />
        </button>
        <ScrollArea>{children}</ScrollArea>
      </Sheet>
    </>
  );
});

export { Tray };

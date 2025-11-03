import React, { forwardRef } from 'react';

import { cn } from '../../utils';
import { ScrollArea } from '../ScrollArea';
import { Sheet } from '../Sheet';
import { Text } from '../Text';
import styles from './Tray.module.scss';

type Props = {
  // content for the tray
  children: React.ReactNode;
  // whether the tray is open
  open?: boolean;
  // called when the tray should be closed
  onOpenChange?: (open: boolean) => void;
  // optional class name
  className?: string;
  // size of the tray
  size?: 'narrow' | 'medium' | 'extended';
  // trigger for the tray
  trigger?: React.ReactNode;
};

const Tray = forwardRef((props: Props, ref: any) => {
  const {
    children,
    className,
    size = 'medium',
    trigger,
    open,
    onOpenChange,
  } = props;
  const [openState, setOpenState] = React.useState(false);
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const finalRef = ref || sheetRef;

  React.useEffect(() => {
    if (open !== undefined) {
      setOpenState(open);
    }
  }, [open]);

  const themeClass = cn(styles.Tray, className);
  return (
    <Sheet
      open={openState}
      onOpenChange={(open) => {
        setOpenState(open);
        if (onOpenChange) {
          onOpenChange(open);
        }
      }}
    >
      <Sheet.Trigger>{trigger}</Sheet.Trigger>
      <Sheet.Content
        side="bottom"
        ref={finalRef}
        className={themeClass}
        size={size}
      >
        <button
          className={styles.Bar}
          onClick={() => {
            setOpenState(false);
            if (onOpenChange) {
              onOpenChange(false);
            }
          }}
        >
          <Text visuallyHidden>close tray</Text>
          <div />
        </button>
        <ScrollArea>{children}</ScrollArea>
      </Sheet.Content>
    </Sheet>
  );
});

export { Tray };

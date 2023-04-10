import * as Dialog from '@radix-ui/react-dialog';
import cx from 'classnames';
import { forwardRef, Ref } from 'react';
import dialogStyles from '../Dialog/Dialog.module.scss';
import styles from './Sheet.module.scss';

export interface SheetProps extends Dialog.DialogProps {
  // the title of the sheet (used for accessibility)
  title?: string;
  // which side of the screen the sheet should appear on
  side?: 'left' | 'right' | 'top' | 'bottom';
  // called when the sheet is opened or closed
  onOpenChange?: (open: boolean) => void;
  // control the open state of the sheet
  isOpen?: boolean;
  // the size of the sheet
  size?: 'narrow' | 'medium' | 'wide' | 'extended' | 'full';
}

const Sheet = forwardRef((props: SheetProps, ref: Ref<HTMLDivElement>) => {
  const {
    children,
    title,
    side = 'left',
    size = 'narrow',
    isOpen,
    ...rest
  } = props;
  const themeClass = cx(styles.Sheet, styles[side], styles[size]);

  return (
    <div className={`opub-Sheet`} ref={ref}>
      <Dialog.Root {...rest} open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={dialogStyles.Overlay} />
          <Dialog.Content className={themeClass}>
            {title && (
              <div className="sr-only">
                <Dialog.Title>{title}</Dialog.Title>
              </div>
            )}
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
});

export { Sheet };

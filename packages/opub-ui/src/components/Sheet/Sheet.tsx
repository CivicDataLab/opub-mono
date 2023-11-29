import dialogStyles from '../Dialog/Dialog.module.scss';
import styles from './Sheet.module.scss';
import * as Dialog from '@radix-ui/react-dialog';
import cx from 'classnames';
import { forwardRef, Ref } from 'react';

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
  // whether the sheet should act as a modal (prevents interaction with the rest of the page)
  modal?: boolean;
  // add classes to the sheet
  className?: string;
}

const Sheet = forwardRef((props: SheetProps, ref: Ref<HTMLDivElement>) => {
  const {
    children,
    title,
    side = 'left',
    size = 'narrow',
    isOpen,
    className,
    ...rest
  } = props;
  const themeClass = cx(styles.Sheet, styles[side], styles[size], className);

  return (
    <div className={`opub-Sheet`} ref={ref}>
      <Dialog.Root {...rest} open={isOpen} modal={false}>
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

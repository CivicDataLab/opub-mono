import dialogStyles from '../Dialog/Dialog.module.scss';
import styles from './Sheet.module.scss';
import * as Dialog from '@radix-ui/react-dialog';
import cx from 'classnames';
import { forwardRef, Ref } from 'react';

interface SheetProps extends Dialog.DialogProps {
  Trigger?: Dialog.DialogTriggerProps;
  Content?: SheetProps;
}

const Sheet = ({ children, ...props }: SheetProps) => {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
};

interface TriggerProps extends Dialog.DialogTriggerProps {}
const Trigger = forwardRef(
  (
    { children, ...props }: TriggerProps,
    ref: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <Dialog.Trigger {...props} asChild ref={ref}>
        {children}
      </Dialog.Trigger>
    );
  }
);

export interface SheetContentProps extends Dialog.DialogProps {
  // the title of the sheet (used for accessibility)
  title?: string;
  // which side of the screen the sheet should appear on
  side?: 'left' | 'right' | 'top' | 'bottom';
  // the size of the sheet
  size?: 'narrow' | 'medium' | 'wide' | 'extended' | 'full';
  // add classes to the sheet
  className?: string;
  // a ref to the sheet
  ref?: Ref<HTMLDivElement>;
}

const Content = forwardRef(
  (props: SheetContentProps, ref: Ref<HTMLDivElement>) => {
    const {
      children,
      title,
      side = 'left',
      size = 'narrow',
      className,
    } = props;
    const themeClass = cx(styles.Sheet, styles[side], styles[size], className);

    return (
      <Dialog.Portal>
        <Dialog.Overlay className={dialogStyles.Overlay} />
        <Dialog.Content className={themeClass} ref={ref}>
          {title && (
            <div className="sr-only">
              <Dialog.Title>{title}</Dialog.Title>
            </div>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    );
  }
);

Sheet.Trigger = Trigger;
Sheet.Content = Content;

export { Sheet };

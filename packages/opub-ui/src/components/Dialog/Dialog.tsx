import React, { Ref, forwardRef } from 'react';
import * as DialogRadix from '@radix-ui/react-dialog';
import cx from 'classnames';

import styles from './Dialog.module.scss';
import { Footer, FooterProps, Header } from './components';

interface DialogProps extends DialogRadix.DialogProps {
  Trigger?: DialogRadix.DialogTriggerProps;
  Content?: ContentProps;
}

const Dialog = ({ children, ...props }: DialogProps) => {
  return <DialogRadix.Root {...props}>{children}</DialogRadix.Root>;
};

interface TriggerProps extends DialogRadix.DialogTriggerProps {}
const Trigger = forwardRef(
  (
    { children, ...props }: TriggerProps,
    ref: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <DialogRadix.Trigger {...props} asChild ref={ref}>
        {children}
      </DialogRadix.Trigger>
    );
  }
);

type ContentProps = {
  /** The content to display inside modal */
  children: React.ReactNode;
  /** Inner content of the footer */
  footer?: React.ReactNode;
  /** The content for the title of the modal */
  title: string | React.ReactNode;
  /**
   * Hide the title in the modal
   * @default false
   */
  titleHidden?: boolean;
  // header hidden
  headerHidden?: boolean;

  /** id for the dialog */
  id?: string;
  /** Disable animations and open modal instantly */
  instant?: boolean;
  /** Increases the modal width */
  large?: boolean;
  /** Decreases the modal width */
  small?: boolean;
  /** Limits modal height on large sceens with scrolling */
  limitHeight?: boolean;
  /** Sets modal to the height of the viewport on small screens */
  fullScreen?: boolean;
} & DialogRadix.DialogContentProps &
  FooterProps;

const Content = forwardRef((props: ContentProps, ref: any) => {
  const {
    children,
    title,
    titleHidden = false,
    id,
    instant,
    large,
    small,
    limitHeight,
    fullScreen,
    footer,
    primaryAction,
    secondaryActions,
    headerHidden,
    className,
    ...others
  } = props;
  const rId = React.useId();
  const finalId = props.id || rId;

  const classnameStyles = cx(
    styles.Dialog,
    small && styles.sizeSmall,
    large && styles.sizeLarge,
    limitHeight && styles.limitHeight,
    fullScreen && styles.fullScreen
  );

  return (
    <DialogRadix.Portal>
      <DialogRadix.Overlay className={styles.Overlay} />
      <DialogRadix.Content ref={ref} className={classnameStyles} {...others}>
        <div className="sr-only">
          <DialogRadix.Title>{title}</DialogRadix.Title>
        </div>
        {headerHidden ? null : (
          <Header id={finalId} titleHidden={titleHidden} children={title} />
        )}
        <div className={cx(styles.Content, className)}>{children}</div>
        {footer && (
          <Footer
            children={footer}
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
          />
        )}
      </DialogRadix.Content>
    </DialogRadix.Portal>
  );
});

Dialog.Trigger = Trigger;
Dialog.Content = Content;

export { Dialog };

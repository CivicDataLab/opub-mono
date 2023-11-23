import styles from '../Dialog/Dialog.module.scss';
import { Footer, FooterProps } from '../Dialog/components';
import { Header } from './components';
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';
import cx from 'classnames';
import React, { forwardRef, Ref } from 'react';

interface DialogProps extends AlertDialogRadix.DialogProps {
  Trigger?: AlertDialogRadix.DialogTriggerProps;
  Content?: ContentProps;
}

const AlertDialog = ({ children, ...props }: DialogProps) => {
  return <AlertDialogRadix.Root {...props}>{children}</AlertDialogRadix.Root>;
};

interface TriggerProps extends AlertDialogRadix.DialogTriggerProps {}
const Trigger = forwardRef(
  (
    { children, ...props }: TriggerProps,
    ref: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <AlertDialogRadix.Trigger {...props} asChild ref={ref}>
        {children}
      </AlertDialogRadix.Trigger>
    );
  }
);

export type ContentProps = {
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
} & AlertDialogRadix.DialogContentProps &
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
    ...others
  } = props;
  const rId = React.useId();
  const finalId = id || rId;

  const classname = cx(
    styles.Dialog,
    small && styles.sizeSmall,
    large && styles.sizeLarge,
    limitHeight && styles.limitHeight,
    fullScreen && styles.fullScreen,
    instant && styles.Instant
  );

  return (
    <AlertDialogRadix.Portal>
      <AlertDialogRadix.Overlay className={styles.Overlay} />
      <AlertDialogRadix.Content ref={ref} className={classname} {...others}>
        <div className="sr-only">
          <AlertDialogRadix.Title>{title}</AlertDialogRadix.Title>
        </div>
        <Header id={finalId} titleHidden={titleHidden} children={title} />
        <div className={styles.Content}>{children}</div>
        <Footer
          children={footer}
          primaryAction={primaryAction}
          secondaryActions={secondaryActions}
        />
      </AlertDialogRadix.Content>
    </AlertDialogRadix.Portal>
  );
});

AlertDialog.Trigger = Trigger;
AlertDialog.Content = Content;

export { AlertDialog };

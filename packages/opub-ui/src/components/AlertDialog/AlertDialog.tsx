import * as AlertDialog from '@radix-ui/react-alert-dialog';
import cx from 'classnames';
import React, { forwardRef, Ref } from 'react';
import { Footer, FooterProps } from '../Dialog/components';
import styles from '../Dialog/Dialog.module.scss';
import { Header } from './components';

const Dialog = AlertDialog.Root;

interface TriggerProps extends AlertDialog.DialogTriggerProps {}
const Trigger = forwardRef(
  (
    { children, ...props }: TriggerProps,
    ref: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <AlertDialog.Trigger {...props} asChild ref={ref}>
        {children}
      </AlertDialog.Trigger>
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
} & AlertDialog.DialogContentProps &
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
  const finalId = props.id || rId;

  const classname = cx(
    styles.Dialog,
    small && styles.sizeSmall,
    large && styles.sizeLarge,
    limitHeight && styles.limitHeight,
    fullScreen && styles.fullScreen
  );

  return (
    <div className={`opub-Dialog`}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.Overlay} />
        <AlertDialog.Content ref={ref} className={classname} {...others}>
          <div className="sr-only">
            <AlertDialog.Title>{title}</AlertDialog.Title>
          </div>
          <Header id={finalId} titleHidden={titleHidden} children={title} />
          <div className={styles.Content}>{children}</div>
          <Footer
            children={footer}
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
          />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </div>
  );
});

export { Dialog, Trigger, Content };

import * as DialogRadix from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, { forwardRef, Ref } from 'react';
import { Footer, FooterProps, Header } from './components';
import styles from './Dialog.module.scss';

const Dialog = DialogRadix.Root;

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
      <DialogRadix.Portal>
        <DialogRadix.Overlay className={styles.Overlay} />
        <DialogRadix.Content ref={ref} className={classname} {...others}>
          <div className="sr-only">
            <DialogRadix.Title>{title}</DialogRadix.Title>
          </div>
          <Header id={finalId} titleHidden={titleHidden} children={title} />
          <div className={styles.Content}>{children}</div>
          <Footer
            children={footer}
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
          />
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </div>
  );
});

export { Dialog, Trigger, Content };
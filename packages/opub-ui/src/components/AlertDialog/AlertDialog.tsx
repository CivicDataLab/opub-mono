import React from 'react';
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';

import { cn } from '../../utils';
import { Text } from '../Text';
import styles from './AlertDialog.module.scss';
import dialogStyles from '../Dialog/Dialog.module.scss';
import { Footer, Header } from './components';
import type { FooterProps } from './components';

interface DialogProps extends AlertDialogRadix.AlertDialogProps {
  Trigger?: AlertDialogRadix.AlertDialogTriggerProps;
  Content?: ContentProps;
  children?: React.ReactNode;
}

const AlertDialog = ({ children, ...props }: DialogProps) => {
  return <AlertDialogRadix.Root {...props}>{children}</AlertDialogRadix.Root>;
};

interface TriggerProps extends AlertDialogRadix.AlertDialogTriggerProps {
  children?: React.ReactNode;
}
const Trigger = ({ children, ref, ...props }: TriggerProps & { ref?: any }) => {
  return (
    <AlertDialogRadix.Trigger {...props} asChild ref={ref}>
      {children}
    </AlertDialogRadix.Trigger>
  );
};

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
} & AlertDialogRadix.AlertDialogContentProps &
  FooterProps;

const Content = ({ ref, ...props }: ContentProps & { ref?: any }) => {
  const {
    children,
    title,
    titleHidden = false,
    id,
    instant,
    large,
    small,
    footer,
    primaryAction,
    secondaryActions,
    ...others
  } = props;
  const rId = React.useId();
  const finalId = id || rId;

  const classname = cn(
    styles.AlertDialog,
    small && styles.sizeSmall,
    large && styles.sizeLarge,
    instant && styles.Instant
  );

  const bodyMarkup =
    typeof children === 'string' || typeof children === 'number' ? (
      <Text as="p" variant="bodyMd" color="subdued">
        {children}
      </Text>
    ) : (
      children
    );

  return (
    <AlertDialogRadix.Portal>
      <AlertDialogRadix.Overlay className={dialogStyles.Overlay} />
      <AlertDialogRadix.Content ref={ref} className={classname} {...others}>
        <Header id={finalId} titleHidden={titleHidden}>
          {title}
        </Header>
        <AlertDialogRadix.Description asChild>
          <div className={styles.Body}>{bodyMarkup}</div>
        </AlertDialogRadix.Description>
        <Footer
          children={footer}
          primaryAction={primaryAction}
          secondaryActions={secondaryActions}
        />
      </AlertDialogRadix.Content>
    </AlertDialogRadix.Portal>
  );
};

AlertDialog.Trigger = Trigger;
AlertDialog.Content = Content;

export { AlertDialog };

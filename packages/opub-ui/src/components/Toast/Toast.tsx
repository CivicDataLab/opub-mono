import React, { ReactNode } from 'react';
import styles from './Toast.module.scss';
import cx from 'classnames';
import * as ToastRadix from '@radix-ui/react-toast';
import { Button } from '../Button';
import { stateIcon } from '@ui/utils/icons';

type RadixMainProps = React.ComponentProps<typeof ToastRadix.Provider> & {
  trigger: ReactNode;
  toastOpen: boolean;
  toggleToastCallback: (args: boolean) => void;
  toastTitle: string;
  toastDescription?: ReactNode;
  variant: string;
};

type ToastActionProps = React.ComponentProps<typeof ToastRadix.Provider> & {
  toastActionText: ReactNode;
  altText: string;
  actionCallback: () => void;
};

type ToastNoActionProps = React.ComponentProps<typeof ToastRadix.Provider> & {
  toastActionText?: undefined;
  altText?: never;
  actionCallback?: never;
};

type RadixProps = RadixMainProps & (ToastActionProps | ToastNoActionProps);

const Toast = ({
  trigger,
  toastOpen,
  toggleToastCallback,
  toastTitle,
  toastDescription,
  toastActionText,
  altText,
  actionCallback,
  variant,
  ...otherProps
}: RadixProps) => {
  const CloseIcon = stateIcon['close'];
  const ErrorIcon = stateIcon[variant];
  const RootStyles = cx(
    styles.ToastRoot,
    variant === 'error' && styles.ToastError,
    toastDescription && styles.ToastDescriptionArea
  );

  const CloseButtonStyles = cx(
    styles.ToastClose,
    variant === 'error' && styles.ToastCloseError
  );

  return (
    <ToastRadix.Provider {...otherProps}>
      {trigger}
      <ToastRadix.Root
        className={RootStyles}
        open={toastOpen}
        onOpenChange={toggleToastCallback}
      >
        <ToastRadix.Title className={styles.ToastTitle}>
          {variant === 'error' ? (
            <div className={styles.ErrorIconArea}>
              <ErrorIcon />
              {toastTitle}
            </div>
          ) : (
            toastTitle
          )}
        </ToastRadix.Title>
        {toastDescription && (
          <ToastRadix.Description asChild>
            {toastDescription}
          </ToastRadix.Description>
        )}
        {toastActionText && (
          <ToastRadix.Action
            className={styles.ToastAction}
            // asChild
            altText={altText}
          >
            {toastActionText}
          </ToastRadix.Action>
        )}
        <ToastRadix.Close className={CloseButtonStyles}>
          <CloseIcon />
        </ToastRadix.Close>
      </ToastRadix.Root>

      <ToastRadix.Viewport className={styles.ToastViewPort} />
    </ToastRadix.Provider>
  );
};

Toast.defaultProps = {
  variant: 'default',
  toastTitle: 'Message sent',
  trigger: <Button>Trigger Toast</Button>,
  toastOpen: false,
  toggleToastCallback: () => {},
};

export { Toast };

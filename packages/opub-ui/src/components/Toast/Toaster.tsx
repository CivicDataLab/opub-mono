// import { useToast } from '@ui/utils/hooks/use-toast';
import styles from './Toast.module.scss';
// import { stateIcon } from '@ui/utils/icons';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';
import { useToast } from '../../utils/hooks/use-toast';
import { stateIcon } from '../../utils';

export function Toaster() {
  const { toasts } = useToast();
  const ErrorIcon = stateIcon['error'];

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }: any) {
        return (
          <Toast key={id} {...props}>
            <div className={styles.ToastContainer}>
              {title && (
                <ToastTitle>
                  {props?.variant === 'error' ? (
                    <div className={styles.ErrorIconArea}>
                      <ErrorIcon />
                      {title}
                    </div>
                  ) : (
                    title
                  )}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose {...props} />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

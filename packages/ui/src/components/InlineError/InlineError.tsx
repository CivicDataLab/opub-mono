import { AlertCircle } from '@opub-icons/workflow';
import type { Error } from '@ui/types/shared/form';
import styles from './InlineError.module.scss';

export interface InlineErrorProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
}

function InlineError({ message, fieldID }: InlineErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div id={errorTextID(fieldID)} className={styles.InlineError}>
      <div className={styles.Icon}>
        <AlertCircle size={14} />
      </div>
      {message}
    </div>
  );
}

export function errorTextID(id: string) {
  return `${id}Error`;
}

export { InlineError };

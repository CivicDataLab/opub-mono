import {
  Alert,
  AlertCircle,
  AlertCircleFilled,
  CheckmarkCircle,
  Info,
} from '@opub-icons/workflow';
import type { Error } from '@ui/types/shared/form';
import styles from './InlineMessage.module.scss';

export interface InlineMessageProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
  /** State of the message. Defaut is error */
  state?: 'success' | 'error' | 'warning' | 'info';
}

const stateColor = {
  success: 'success',
  error: 'critical',
  warning: 'warning',
  info: 'highlight',
};

const stateIcon = {
  success: CheckmarkCircle,
  error: AlertCircleFilled,
  warning: Alert,
  info: Info,
};

function InlineMessage({
  message,
  fieldID,
  state = 'error',
}: InlineMessageProps) {
  if (!message) {
    return null;
  }
  const Icon = stateIcon[state] || AlertCircle;
  return (
    <div
      id={errorTextID(fieldID)}
      className={styles.InlineError}
      style={{
        // @ts-ignore
        '--text-color': `var(--text-${stateColor[state]})`,
        '--icon-color': `var(--icon-${stateColor[state]})`,
      }}
    >
      <div className={styles.Icon}>
        <Icon size={14} />
      </div>
      {message}
    </div>
  );
}

export function errorTextID(id: string) {
  return `${id}Error`;
}

export { InlineMessage };

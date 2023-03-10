import type { Error } from '@ui/types/shared/form';
import { stateIcon } from '@ui/utils/icons';
import React from 'react';
import styles from './InlineMessage.module.scss';

export interface InlineMessageProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
  /** State of the message. Defaut is error */
  appearance?: 'success' | 'error' | 'warning' | 'info';
}

const stateColor = {
  success: 'success',
  error: 'critical',
  warning: 'warning',
  info: 'highlight',
};

function InlineMessage({
  message,
  fieldID,
  appearance = 'error',
}: InlineMessageProps) {
  if (!message) {
    return null;
  }
  const Icon = stateIcon[appearance];
  return (
    <div
      id={`${fieldID}-${appearance}`}
      className={styles.InlineError}
      style={
        {
          '--text-color': `var(--text-${stateColor[appearance]})`,
          '--icon-color': `var(--icon-${stateColor[appearance]})`,
        } as React.CSSProperties
      }
    >
      <div className={styles.Icon}>
        <Icon size={14} />
      </div>
      {message}
    </div>
  );
}

export { InlineMessage };

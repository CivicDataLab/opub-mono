import React from 'react';

import { Color } from '../../types/icon';
import type { Error } from '../../types/shared/form';
import { Icon } from '../Icon';
import { stateIcon } from './icons';
import styles from './InlineMessage.module.scss';

export interface InlineMessageProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
  /** State of the message. Defaut is error */
  appearance?: 'success' | 'error' | 'warning' | 'info';
}

const stateColor: Record<string, Color | undefined> = {
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
  const icon = stateIcon[appearance];
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
        <Icon source={icon} color={stateColor[appearance] || 'critical'} />
      </div>
      {message}
    </div>
  );
}

export { InlineMessage };

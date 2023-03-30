import React from 'react';
import cx from 'classnames';
import { Text } from '../../../Text';
import { Progress, Status } from '../../../../types/badge';
import styles from './Pip.module.scss';

export interface PipProps {
  status?: Status;
  progress?: Progress;
  accessibilityLabelOverride?: string;
}

function variationName(name: string, value: string) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export const Pip = ({
  status,
  progress = 'complete',
  accessibilityLabelOverride,
}: PipProps) => {
  const className = cx(
    styles.Pip,
    status && styles[variationName('status', status)],
    progress && styles[variationName('progress', progress)]
  );

  const accessibilityLabel = accessibilityLabelOverride;

  return (
    <span className={className}>
      <Text as="span" visuallyHidden>
        {accessibilityLabel}
      </Text>
    </span>
  );
};

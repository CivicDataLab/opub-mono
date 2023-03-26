import React, { forwardRef } from 'react';
import styles from './Badge.module.scss';
import { BadgeProps } from '@ui/types/badge';
import { Text } from '../Text';
import { Pip } from './components/Pip';
import cx from 'classnames';

export const Badge = ({
  progress = 'default',
  status,
  children,
  icon,
  statusAndProgressLabelOverride,
}: BadgeProps) => {

  const accessibilityLabel = statusAndProgressLabelOverride;

  let accessibilityMarkup = Boolean(accessibilityLabel) && (
    <Text as="span" visuallyHidden>
      {accessibilityLabel}
    </Text>
  );

  if (progress && !icon) {
    accessibilityMarkup = (
      <span className={styles.PipContainer}>
        <Pip
          progress={progress}
          status={status}
          accessibilityLabelOverride={accessibilityLabel}
        />
      </span>
    );
  }

  function variationName(name: string, value: string) {
    return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }
  
  const className = cx(
    styles.Badge,
    status && styles[variationName('status', status)],
  );
  
  return (
    <span
      className={className}
      aria-label={statusAndProgressLabelOverride}
    >
      {accessibilityMarkup}
      {icon && (
        <span className={styles.Icon}>
          {icon}
        </span>
      )}
      {children && (
        <Text
          as="span"
          variant="bodySm"
          fontWeight={status === 'new' ? 'medium' : undefined}
        >
          {children}
        </Text>
      )}
    </span>
  );
};

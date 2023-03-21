import React, { forwardRef } from 'react';
import styles from './Badge.module.scss';
import cx from 'classnames';
import { BadgeProps } from '@ui/types/badge';

export const Badge = ({ progress = 'default', ...props }: BadgeProps) => {
  const style = {} as React.CSSProperties;

  return <span className={styles.Badge} style={style}>Fulfilled</span>
};

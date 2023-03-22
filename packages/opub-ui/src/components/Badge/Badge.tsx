import React, { forwardRef } from 'react';
import styles from './Badge.module.scss';
import cx from 'classnames';
import { BadgeProps } from '@ui/types/badge';
import { Complete, Incomplete, Partial } from './icons';

const progressIcons = {
  incomplete: <Incomplete />,
  partiallyComplete: <Partial />,
  complete: <Complete />,
  default: null,
};

export const Badge = ({
  progress = 'default',
  children,
  icon: IconComponent,
  color = 'default',
  statusAndProgressLabelOverride,
}: BadgeProps) => {

  const icon = progressIcons[progress];
  const iconMarkup = IconComponent ? <IconComponent /> : icon;

  const style = {
    backgroundColor: color === 'default' ? '#E4E5E7' : color,
  } as React.CSSProperties;

  return (
    <span className={styles.Badge} style={style} aria-label={statusAndProgressLabelOverride}>
      <span> {iconMarkup} </span>
      {children}
    </span>
  );
};

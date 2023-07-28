import { DividerProps } from '../../types/divider';
import styles from './Divider.module.scss';
import React from 'react';

export const Divider = ({
  borderStyle = 'divider',
  className,
}: DividerProps) => {
  const style = {
    '--divider-border-style': borderStyle
      ? `var(--border-${borderStyle})`
      : undefined,
  } as React.CSSProperties;

  return <hr className={styles.Divider + ` ${className}`} style={style} />;
};

import React from 'react';
import styles from './Divider.module.scss';
import { DividerProps } from '../../types/divider';

export const Divider = ({ borderStyle = 'divider' }: DividerProps) => {
  const style = {
    '--divider-border-style': borderStyle
      ? `var(--border-${borderStyle})`
      : undefined,
  } as React.CSSProperties;

  return <hr className={styles.Divider} style={style} />;
};

import * as React from 'react';
import styles from './Button.module.scss';

export const Button = ({ children, ...rest }: any) => {
  return (
    <button className={styles.base} {...rest}>
      {children}
    </button>
  );
};

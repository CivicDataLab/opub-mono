import * as React from 'react';
import styles from './Button.module.scss';
import cx from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'disabled';
  size?: 'small' | 'large';
  fluid?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'small',
  fluid = false,
  children,
  ...rest
}: Props) => {
  const themeClass = cx(styles.btn, {
    [styles[`btn-${variant}`]]: variant,
    [styles[`btn-fluid`]]: fluid,
    [styles[`btn-${size}`]]: size,
  });

  return (
    <button className={themeClass} {...rest}>
      {children}
    </button>
  );
};

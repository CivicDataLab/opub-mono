import * as React from 'react';
import styles from './Button.module.scss';
import cx from 'classnames';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'disabled';
  size?: 'small' | 'large';
  fluid?: boolean;
  children: React.ReactNode;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  BaseProps & {
    href?: undefined;
  };

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseProps & {
    href?: string;
  };

type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: AnchorProps): JSX.Element;
};

// Guard to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
  'href' in props;

export const Button: Overload = (props: ButtonProps | AnchorProps) => {
  const {
    variant = 'primary',
    size = 'small',
    fluid = false,
    children,
    ...rest
  } = props;

  const themeClass = cx(styles.btn, {
    [styles[`btn-${variant}`]]: variant,
    [styles[`btn-fluid`]]: fluid,
    [styles[`btn-${size}`]]: size,
    [styles[`btn-isLink`]]: hasHref(props),
  });

  const Tag: any = hasHref(props) ? 'a' : 'button';

  return (
    <Tag className={themeClass} {...rest}>
      {children}
    </Tag>
  );
};

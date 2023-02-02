import * as React from 'react';
import styles from './Button.module.scss';
import cx from 'classnames';

type BaseProps = {
  // Type of button
  variant?: 'primary' | 'secondary' | 'disabled';

  // Size of button
  size?: 'small' | 'large';

  // Should the button fill the container
  fluid?: boolean;

  // Content of the Button
  children: React.ReactNode;

  // Icon to add before button text
  iconBefore?: React.ReactNode;

  // Icon to add after button text
  iconAfter?: React.ReactNode;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  BaseProps & {
    href?: undefined;
  };

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseProps & {
    href?: string;
  };

// Guard to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
  'href' in props;

const Button = (props: ButtonProps | AnchorProps, ref: any) => {
  const {
    variant = 'primary',
    size = 'small',
    fluid = false,
    children,
    iconBefore,
    iconAfter,
    ...rest
  } = props;

  const themeClass = cx(styles.btn, {
    [styles[`btn-${variant}`]]: variant,
    [styles[`btn-fluid`]]: fluid,
    [styles[`btn-${size}`]]: size,
    [styles[`btn-isLink`]]: hasHref(props),
    [styles[`btn-hasIcon`]]: iconBefore || iconAfter,
  });

  const Tag: any = hasHref(props) ? 'a' : 'button';

  return (
    <Tag ref={ref} className={themeClass} {...rest}>
      {iconBefore ? iconBefore : null}
      {children}
      {iconAfter ? iconAfter : null}
    </Tag>
  );
};

export default React.forwardRef(Button);

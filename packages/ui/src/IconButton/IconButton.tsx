import * as React from 'react';
import styles from './IconButton.module.scss';
import cx from 'classnames';

type BaseProps = {
  // Type of button
  variant?: 'primary' | 'secondary' | 'disabled';

  // Size of button
  size?: 'small' | 'large';

  // Content of the Button
  children: React.ReactNode;

  // Icon to add to the button
  icon: React.ReactNode;
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

const IconButton = React.forwardRef(
  (props: ButtonProps | AnchorProps, ref: any) => {
    const {
      variant = 'primary',
      size = 'small',
      children,
      icon,
      ...rest
    } = props;

    const themeClass = cx(styles.btn, {
      [styles[`btn-${variant}`]]: variant,
      [styles[`btn-${size}`]]: size,
      [styles[`btn-isLink`]]: hasHref(props),
    });

    const Tag: any = hasHref(props) ? 'a' : 'button';

    return (
      <Tag ref={ref} className={`btn-${variant} ${themeClass}`} {...rest}>
        {icon}
        <span className="sr-only">{children}</span>
      </Tag>
    );
  }
);

export { IconButton };

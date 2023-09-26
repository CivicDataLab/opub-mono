import { IconButtonProps } from '../../types';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import styles from './IconButton.module.scss';
import { forwardRef } from 'react';

const iconSizes = {
  slim: 20,
  medium: 24,
  large: 28,
};

const IconButton = forwardRef((props: IconButtonProps, ref: any) => {
  const {
    children,
    icon,
    size = 'medium',
    withTooltip,
    tooltipText,
    disabled,
    color,
    className,
    ...others
  } = props;
  const themeClass = cn(
    styles.IconButton,
    styles[size],
    disabled && styles.disabled,
    className
  );
  const iconSize = iconSizes[size];

  const buttonMarkup = (
    <>
      <button
        {...others}
        className={`opub-IconButton ${themeClass}`}
        ref={ref}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          props.onClick?.(e);
        }}
      >
        <Text visuallyHidden>{children}</Text>
        <Icon source={icon} size={iconSize} color={color ? color : 'base'} />
      </button>
    </>
  );

  const markup =
    withTooltip || disabled || tooltipText ? (
      <Tooltip content={tooltipText || children}>{buttonMarkup}</Tooltip>
    ) : (
      buttonMarkup
    );

  return markup;
});

export { IconButton };

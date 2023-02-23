import { variationName } from '@ui/utils/css';
import { MouseUpBlurHandler, handleMouseUpByBlurring } from '@ui/utils/focus';
import cx from 'classnames';
import * as React from 'react';
import { Spinner } from '../Spinner';
import { UnstyledButton, UnstyledButtonProps } from './BaseButton';
import styles from './Button.module.scss';

export interface ButtonProps extends UnstyledButtonProps {
  // Type of button
  variant?: 'primary' | 'destructive' | 'outline' | 'plain';
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: 'slim' | 'medium' | 'large';
  /** Allows the button to grow to the width of its container */
  fullWidth?: boolean;
  // Content of the Button
  children: string | string[];
  /** Removes underline from button text (including on interaction) when `monochrome` and `plain` are true */
  removeUnderline?: boolean;

  // Icon to add before button text
  iconBefore?: React.ReactNode;

  // Icon to add after button text
  iconAfter?: React.ReactNode;
}

interface CommonButtonProps
  extends Pick<
    ButtonProps,
    | 'id'
    | 'accessibilityLabel'
    | 'ariaDescribedBy'
    | 'role'
    | 'onClick'
    | 'onFocus'
    | 'onBlur'
    | 'onMouseEnter'
    | 'onTouchStart'
  > {
  className: UnstyledButtonProps['className'];
  onMouseUp: MouseUpBlurHandler;
  'data-primary-link'?: boolean;
}

type LinkButtonProps = Pick<ButtonProps, 'url' | 'external' | 'download'>;

type ActionButtonProps = Pick<
  ButtonProps,
  | 'submit'
  | 'disabled'
  | 'loading'
  | 'ariaControls'
  | 'ariaExpanded'
  | 'ariaChecked'
  | 'pressed'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onPointerDown'
>;

const DEFAULT_SIZE = 'medium';

// Guard to check if href exists in props
// const hasHref = (props: ButtonProps): props is AnchorProps =>
//   'href' in props;

const Button = React.forwardRef(
  (
    {
      id,
      children,
      variant,
      url,
      disabled,
      external,
      download,
      submit,
      loading,
      pressed,
      accessibilityLabel,
      role,
      ariaControls,
      ariaExpanded,
      ariaDescribedBy,
      ariaChecked,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onMouseEnter,
      onTouchStart,
      onPointerDown,
      removeUnderline,
      size = DEFAULT_SIZE,
      textAlign,
      fullWidth,
      dataPrimaryLink,
      icon,
    }: ButtonProps,
    ref: any
  ) => {
    const isDisabled = disabled || loading;

    const className = cx(
      styles.Button,
      variant === 'primary' && styles.primary,
      variant === 'destructive' && styles.destructive,
      variant === 'outline' && styles.outline,
      variant === 'plain' && styles.plain,
      size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
      textAlign && styles[variationName('textAlign', textAlign)],
      fullWidth && styles.fullWidth,
      icon && children == null && styles.iconOnly,
      removeUnderline && styles.removeUnderline,
      pressed && !disabled && !url && styles.pressed,
      isDisabled && styles.disabled,
      loading && styles.loading
    );

    const childMarkup = children ? (
      <span
        className={cx(styles.Text, removeUnderline && styles.removeUnderline)}
        // Fixes Safari bug that doesn't re-render button text to correct color
        key={disabled ? 'text-disabled' : 'text'}
      >
        {children}
      </span>
    ) : null;

    const spinnerSVGMarkup = loading ? (
      <span className={styles.Spinner}>
        <Spinner size="small" accessibilityLabel={'Loading'} />
      </span>
    ) : null;

    const commonProps: CommonButtonProps = {
      id,
      className,
      accessibilityLabel,
      ariaDescribedBy,
      role,
      onClick,
      onFocus,
      onBlur,
      onMouseUp: handleMouseUpByBlurring,
      onMouseEnter,
      onTouchStart,
      'data-primary-link': dataPrimaryLink,
    };
    const linkProps: LinkButtonProps = {
      url,
      external,
      download,
    };
    const actionProps: ActionButtonProps = {
      submit,
      disabled: isDisabled,
      loading,
      ariaControls,
      ariaExpanded,
      ariaChecked,
      pressed,
      onKeyDown,
      onKeyUp,
      onPointerDown,
    };

    return (
      <UnstyledButton
        {...commonProps}
        {...linkProps}
        {...actionProps}
        ref={ref}
      >
        <span className={styles.Content}>
          {spinnerSVGMarkup}
          {/* {iconMarkup} */}
          {childMarkup}
          {/* {disclosureMarkup} */}
        </span>
      </UnstyledButton>
    );
  }
);

export { Button };

import { variationName } from '@ui/utils/css';
import { MouseUpBlurHandler, handleMouseUpByBlurring } from '@ui/utils/focus';
import cx from 'classnames';
import * as React from 'react';
import { Spinner } from '../Spinner';
import { UnstyledButton, UnstyledButtonProps } from './BaseButton';
import styles from './Button.module.scss';
import { ConnectedDisclosure } from '@ui/types';
import { ChevronDown, ChevronUp, ChevronUpDown } from '@opub-icons/workflow';

export interface ButtonProps extends UnstyledButtonProps {
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
  /** Indicates a dangerous or potentially negative action */
  destructive?: boolean;
  /** Gives the button a subtle alternative to the default button styling, appropriate for certain backdrops */
  outline?: boolean;
  /** Renders a button that looks like a link */
  plain?: boolean;

  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: 'slim' | 'medium' | 'large';

  /** Allows the button to grow to the width of its container */
  fullWidth?: boolean;

  // Content of the Button
  children: string | string[];

  /** Makes `plain` and `outline` Button colors (text, borders, icons) the same as the current text color. Also adds an underline to `plain` Buttons */
  monochrome?: boolean;

  /** Removes underline from button text (including on interaction) when `monochrome` and `plain` are true */
  removeUnderline?: boolean;

  /** Icon to display to the left of the button content */
  icon?: React.ReactElement;

  /** Displays the button with a disclosure icon. Defaults to `down` when set to true */
  disclosure?: 'down' | 'up' | 'select' | boolean;

  /** Disclosure button connected right of the button. Toggles a popover action list. */
  connectedDisclosure?: ConnectedDisclosure;

  /** Changes the inner text alignment of the button */
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
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

const Button = ({
  id,
  children,
  primary,
  destructive,
  outline,
  plain,
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
  icon,
  monochrome,
  disclosure,
  connectedDisclosure,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const className = cx(
    styles.Button,
    primary && styles.primary,
    destructive && styles.destructive,
    outline && styles.outline,
    plain && styles.plain,
    monochrome && styles.monochrome,
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    textAlign && styles[variationName('textAlign', textAlign)],
    fullWidth && styles.fullWidth,
    icon && children == null && styles.iconOnly,
    removeUnderline && styles.removeUnderline,
    pressed && !disabled && !url && styles.pressed,
    isDisabled && styles.disabled,
    loading && styles.loading,
    textAlign && styles[variationName('textAlign', textAlign)],
    connectedDisclosure && styles.connectedDisclosure
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

  const iconMarkup = icon ? (
    <span className={cx(styles.Icon, loading && styles.hidden)}>{icon}</span>
  ) : null;

  const disclosureMarkup = disclosure ? (
    <span className={styles.Icon}>
      <div className={cx(styles.DisclosureIcon, loading && styles.hidden)}>
        {loading ? (
          <div className={styles.Placeholder} />
        ) : (
          getDisclosureIconSource(disclosure)
        )}
      </div>
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
    <UnstyledButton {...commonProps} {...linkProps} {...actionProps}>
      <span className={styles.Content}>
        {spinnerSVGMarkup}
        {iconMarkup}
        {childMarkup}
        {disclosureMarkup}
      </span>
    </UnstyledButton>
  );
};

export { Button };

function getDisclosureIconSource(
  disclosure: NonNullable<ButtonProps['disclosure']>
) {
  if (disclosure === 'select') {
    return <ChevronUpDown size={14} />;
  }

  return disclosure === 'up' ? <ChevronUp /> : <ChevronDown />;
}

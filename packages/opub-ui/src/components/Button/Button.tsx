import * as React from 'react';
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from '@tabler/icons-react';

import { ConnectedDisclosure } from '../../types/button';
import { cn, variationName } from '../../utils/css';
import { handleMouseUpByBlurring, MouseUpBlurHandler } from '../../utils/focus';
import { Icon } from '../Icon';
import { Menu } from '../Menu';
import { Spinner } from '../Spinner';
import { UnstyledButton, UnstyledButtonProps } from './BaseButton';
import styles from './Button.module.scss';

export interface NonMutualButtonProps {
  kind?: 'primary' | 'secondary' | 'tertiary';

  variant?: 'basic' | 'interactive' | 'critical' | 'success';

  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: 'slim' | 'medium' | 'large';

  /** Allows the button to grow to the width of its container */
  fullWidth?: boolean;

  /** Makes `plain` and `outline` Button colors (text, borders, icons) the same as the current text color. Also adds an underline to `plain` Buttons */
  monochrome?: boolean;

  /** Removes underline from button text (including on interaction) when `monochrome` and `plain` are true */
  removeUnderline?: boolean;

  /** Icon to display to the left of the button content */
  icon?: React.ReactNode;

  /** Displays the button with a disclosure icon. Defaults to `down` when set to true */
  disclosure?: 'down' | 'up' | 'select' | boolean;

  /** Disclosure button connected right of the button. Toggles a popover action list. */
  connectedDisclosure?: ConnectedDisclosure;

  /** Changes the inner text alignment of the button */
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
}

export type ButtonProps = NonMutualButtonProps & UnstyledButtonProps;

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

const Button = React.forwardRef(
  (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const {
      id,
      children,
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
      removeUnderline = true,
      size = DEFAULT_SIZE,
      textAlign,
      fullWidth,
      icon,
      monochrome,
      disclosure,
      connectedDisclosure,
      className: classes,
      kind = 'primary',
      variant = 'basic',
      ...otherProps
    } = props;
    const isDisabled = disabled || loading;

    const className = cn(
      styles.Button,
      styles[variationName('kind', kind)],
      styles[variationName('variant', variant)],
      size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
      textAlign && styles[variationName('textAlign', textAlign)],
      fullWidth && styles.fullWidth,
      icon && children == null && styles.iconOnly,
      removeUnderline && styles.removeUnderline,
      pressed && !disabled && !url && styles.pressed,
      isDisabled && styles.disabled,
      loading && styles.loading,
      textAlign && styles[variationName('textAlign', textAlign)],
      connectedDisclosure && styles.connectedDisclosure,
      classes && classes
    );

    const childMarkup = children ? (
      <span
        className={cn(styles.Text, removeUnderline && styles.removeUnderline)}
        // Fixes Safari bug that doesn't re-render button text to correct color
        key={disabled ? 'text-disabled' : 'text'}
      >
        {children}
      </span>
    ) : null;

    function getSpinnerColor() {
      if (kind === 'primary') {
        return 'surface';
      }

      if (kind === 'secondary') {
        return variant === 'basic' ? 'highlight' : variant;
      }

      return 'default';
    }
    const spinnerSVGMarkup = loading ? (
      <span className={styles.Spinner}>
        <Spinner color={getSpinnerColor()} />
      </span>
    ) : null;

    const iconMarkup = icon ? (
      <span className={cn(styles.Icon, loading && styles.hidden)}>{icon}</span>
    ) : null;

    const disclosureMarkup = disclosure ? (
      <span className={styles.Icon}>
        <div className={cn(styles.DisclosureIcon, loading && styles.hidden)}>
          {loading ? (
            <div className={styles.Placeholder} />
          ) : (
            <Icon
              source={
                loading ? 'placeholder' : getDisclosureIconSource(disclosure)
              }
              color={kind === 'primary' ? 'onBgDefault' : 'highlight'}
            />
          )}
        </div>
      </span>
    ) : null;

    let connectedDisclosureMarkup;
    if (connectedDisclosure && connectedDisclosure.actions.length > 0) {
      const connectedDisclosureClassName = cn(
        styles.Button,
        styles[variationName('kind', kind)],
        styles[variationName('variant', variant)],
        size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
        textAlign && styles[variationName('textAlign', textAlign)],
        connectedDisclosure.disabled && styles.disabled,
        styles.iconOnly,
        styles.ConnectedDisclosure
      );

      const defaultLabel = 'Related actions';
      const {
        disabled: disclosureDisabled,
        accessibilityLabel: disclosureLabel = defaultLabel,
      } = connectedDisclosure;

      const connectedDisclosureActivator = (
        <button
          type="button"
          className={connectedDisclosureClassName}
          aria-disabled={disclosureDisabled}
          aria-label={disclosureLabel}
          aria-describedby={ariaDescribedBy}
          aria-checked={ariaChecked}
          onMouseUp={handleMouseUpByBlurring}
          tabIndex={disclosureDisabled ? -1 : undefined}
        >
          <span className={styles.Icon}>
            <Icon source={IconChevronDown} color="onBgDefault" />
          </span>
        </button>
      );

      connectedDisclosureMarkup = (
        <Menu
          align="end"
          alignOffset={-10}
          trigger={connectedDisclosureActivator}
          items={connectedDisclosure.actions}
        />
      );
    }

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

    const buttonMarkup = (
      <UnstyledButton
        {...commonProps}
        {...linkProps}
        {...actionProps}
        {...otherProps}
        ref={ref}
      >
        <span className={styles.Content}>
          {spinnerSVGMarkup}
          {iconMarkup}
          {childMarkup}
          {disclosureMarkup}
        </span>
      </UnstyledButton>
    );

    return connectedDisclosureMarkup ? (
      <div className={styles.ConnectedDisclosureWrapper}>
        {buttonMarkup}
        {connectedDisclosureMarkup}
      </div>
    ) : (
      buttonMarkup
    );
  }
);

export { Button };

function getDisclosureIconSource(
  disclosure: NonNullable<ButtonProps['disclosure']>
) {
  if (disclosure === 'select') {
    return IconSelector;
  }

  return disclosure === 'up' ? IconChevronUp : IconChevronDown;
}

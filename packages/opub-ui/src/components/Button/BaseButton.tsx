import type { BaseButtonProps } from '../../types/button';
import { handleMouseUpByBlurring } from '../../utils/focus';
import { useDisableClick } from '../../utils/hooks';
import React, { LegacyRef } from 'react';
import { UnstyledLink } from '../Link/BaseLink';
export interface UnstyledButtonProps extends BaseButtonProps {
  /** The content to display inside the button */
  children?: React.ReactNode;
  /** A custom class name to apply styles to button */
  className?: string;
}

export const UnstyledButton = React.forwardRef(
  (
    {
      id,
      children,
      className,
      url,
      external,
      download,
      submit,
      disabled,
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

      ...rest
    }: UnstyledButtonProps,
    ref: LegacyRef<HTMLButtonElement>
  ) => {
    let buttonMarkup;

    const commonProps = {
      id,
      className,
      'aria-label': accessibilityLabel,
    };
    const interactiveProps = {
      ...commonProps,
      role,
      onClick,
      onFocus,
      onBlur,
      onMouseUp: handleMouseUpByBlurring,
      onMouseEnter,
      onTouchStart,
    };

    const handleClick = useDisableClick(disabled, onClick);

    if (url) {
      buttonMarkup = disabled ? (
        // Render an `<a>` so toggling disabled/enabled state changes only the
        // `href` attribute instead of replacing the whole element.
        <a {...commonProps}>{children}</a>
      ) : (
        <UnstyledLink
          {...interactiveProps}
          url={url}
          external={external}
          download={download}
          {...rest}
        >
          {children}
        </UnstyledLink>
      );
    } else {
      buttonMarkup = (
        <button
          {...interactiveProps}
          aria-disabled={disabled}
          type={submit ? 'submit' : 'button'}
          aria-busy={loading ? true : undefined}
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
          aria-describedby={ariaDescribedBy}
          aria-pressed={pressed}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onClick={handleClick}
          tabIndex={disabled ? -1 : undefined}
          ref={ref}
          {...rest}
        >
          {children}
        </button>
      );
    }

    return buttonMarkup;
  }
);

import { BaseButtonProps } from '@ui/types/button';
import { handleMouseUpByBlurring } from '@ui/utils/focus';
import { useDisableClick } from '@ui/utils/hooks';
import React from 'react';
import { UnstyledLink } from '../Link/BaseLink';
export interface UnstyledButtonProps extends BaseButtonProps {
  /** The content to display inside the button */
  children?: React.ReactNode;
  /** A custom class name to apply styles to button */
  className?: string;
  [key: string]: any;
}

export function UnstyledButton({
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
}: UnstyledButtonProps) {
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
        {...rest}
      >
        {children}
      </button>
    );
  }

  return buttonMarkup;
}

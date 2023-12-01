import { Color } from '../../types/icon';
import type { PillProps } from '../../types/pill';
import { cn, variationName } from '../../utils';
import { handleMouseUpByBlurring } from '../../utils/focus';
import { Icon } from '../Icon';
import { Text } from '../Text';
import styles from './Pill.module.scss';
import { IconX } from '@tabler/icons-react';
import React from 'react';

export const Pill = React.forwardRef(
  (
    {
      children,
      disabled = false,
      onRemove = () => {},
      accessibilityLabel,
      url,
      returnValue = '',
      variant = 'neutral',
      ...other
    }: PillProps,
    ref: React.LegacyRef<HTMLSpanElement>
  ) => {
    const className = cn(
      styles.Pill,
      styles.removable,
      variant && styles[variationName('variant', variant)],
      disabled && styles.disabled,
      url && !disabled && styles.linkable
    );

    let tagTitle = accessibilityLabel;

    if (!tagTitle) {
      tagTitle = typeof children === 'string' ? children : undefined;
    }

    const ariaLabel = accessibilityLabel;

    const removeButton = (
      <button
        type="button"
        aria-label={ariaLabel}
        className={cn(styles.Button)}
        onClick={() => onRemove(returnValue)}
        onMouseUp={handleMouseUpByBlurring}
        disabled={disabled}
      >
        <Icon source={IconX} size={16} color={buttonColorMapping(variant)} />
      </button>
    );

    const tagContent =
      url && !disabled ? (
        <a className={cn(styles.Link)} href={url}>
          <Text variant="bodySm">{children}</Text>
        </a>
      ) : (
        <Text variant="bodySm">{children}</Text>
      );

    return (
      <span {...other} className={className} ref={ref}>
        {tagContent}
        {removeButton}
      </span>
    );
  }
);

function buttonColorMapping(variant: any) {
  if (variant === 'neutral') return 'default';
  if (variant === 'info') return 'highlight';
  return variant;
}

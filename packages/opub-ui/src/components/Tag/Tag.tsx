import React from 'react';
import { IconX } from '@tabler/icons-react';

import type { TagProps } from '../../types/tag';
import { cn } from '../../utils';
import { handleMouseUpByBlurring } from '../../utils/focus';
import { Icon } from '../Icon';
import styles from './Tag.module.scss';

export const Tag = React.forwardRef(
  (
    {
      children,
      disabled = false,
      onClick,
      onRemove,
      accessibilityLabel,
      url,
      value = '',
      ...other
    }: TagProps,
    ref: React.LegacyRef<HTMLSpanElement>
  ) => {
    const segmented = onRemove && url && !disabled;
    const className = cn(
      styles.Tag,
      disabled && styles.disabled,
      onClick && onClick.name && styles.clickable,
      onRemove && styles.removable,
      url && !disabled && styles.linkable,
      segmented && styles.segmented
    );

    if (onClick && onClick.name) {
      return (
        <button
          type="button"
          disabled={disabled}
          className={className}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

    let tagTitle = accessibilityLabel;

    if (!tagTitle) {
      tagTitle = typeof children === 'string' ? children : undefined;
    }

    const ariaLabel = accessibilityLabel;

    const removeButton = onRemove ? (
      <button
        type="button"
        aria-label={ariaLabel}
        className={cn(styles.Button, segmented && styles.segmented)}
        onClick={() => onRemove(value)}
        onMouseUp={handleMouseUpByBlurring}
        disabled={disabled}
      >
        <Icon source={IconX} size={16} />
      </button>
    ) : null;

    const tagContent =
      url && !disabled ? (
        <a
          className={cn(styles.Link, segmented && styles.segmented)}
          href={url}
        >
          <span title={tagTitle} className={styles.LinkText}>
            {children}
          </span>
        </a>
      ) : (
        <span title={tagTitle} className={styles.TagText}>
          {children}
        </span>
      );

    return (
      <span {...other} className={className} ref={ref}>
        {tagContent}
        {removeButton}
      </span>
    );
  }
);

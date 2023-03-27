import { CrossSize200 } from '@opub-icons/ui';
import type { TagProps } from '@ui/types/tag';
import { handleMouseUpByBlurring } from '@ui/utils/focus';
import cx from 'classnames';
import React from 'react';
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
      color = 'standard',
      value = '',
      ...other
    }: TagProps,
    ref: React.LegacyRef<HTMLSpanElement>
  ) => {
    const segmented = onRemove && url;
    const className = cx(
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
        className={cx(styles.Button, segmented && styles.segmented)}
        onClick={() => onRemove(value)}
        onMouseUp={handleMouseUpByBlurring}
        disabled={disabled}
      >
        <CrossSize200 />
      </button>
    ) : null;

    const tagContent =
      url && !disabled ? (
        <a
          className={cx(styles.Link, segmented && styles.segmented)}
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
      <span
        {...other}
        className={className}
        ref={ref}
        style={{
          /* @ts-ignore */
          '--background-color': `var(--tag-bg-${color})`,
          '--text-color': `var(--tag-fg-${color})`,
        }}
      >
        {tagContent}
        {removeButton}
      </span>
    );
  }
);

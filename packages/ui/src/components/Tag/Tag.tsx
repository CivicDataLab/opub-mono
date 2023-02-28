import { CrossSize200 } from '@opub-icons/ui';
import { handleMouseUpByBlurring } from '@ui/utils/focus';
import cx from 'classnames';
import React from 'react';
import styles from './Tag.module.scss';

export interface NonMutuallyExclusiveProps {
  /** Content to display in the tag */
  children?: React.ReactNode;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when tag is clicked or keypressed. Renders without remove button or url when set. */
  onClick?(): void;
  /** Callback when remove button is clicked or keypressed. */
  onRemove?(): void;
  /** A string to use when tag has more than textual content */
  accessibilityLabel?: string;
  /** Url to navigate to when tag is clicked or keypressed. */
  url?: string;
  /** Url to navigate to when tag is clicked or keypressed. */
  color?: 'standard' | 'one' | 'two' | 'three' | 'four' | 'five';
}

export type TagProps = NonMutuallyExclusiveProps &
  (
    | { onClick?(): void; onRemove?: undefined; url?: undefined }
    | { onClick?: undefined; onRemove?(): void; url?: string }
  );

export function Tag({
  children,
  disabled = false,
  onClick,
  onRemove,
  accessibilityLabel,
  url,
  color = 'standard',
}: TagProps) {
  const segmented = onRemove && url;
  const className = cx(
    styles.Tag,
    disabled && styles.disabled,
    onClick && styles.clickable,
    onRemove && styles.removable,
    url && !disabled && styles.linkable,
    segmented && styles.segmented
  );

  if (onClick) {
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
      onClick={onRemove}
      onMouseUp={handleMouseUpByBlurring}
      disabled={disabled}
    >
      <CrossSize200 />
    </button>
  ) : null;

  const tagContent =
    url && !disabled ? (
      <a className={cx(styles.Link, segmented && styles.segmented)} href={url}>
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
      className={className}
      style={{
        /* @ts-ignore */
        '--background': `var(--tag-bg-${color})`,
        '--text': `var(--tag-fg-${color})`,
      }}
    >
      {tagContent}
      {removeButton}
    </span>
  );
}

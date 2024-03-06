import React from 'react';

import type { ActionListItemDescriptor } from '../../../../types/actionlist';
import { Color } from '../../../../types/icon';
import { cn } from '../../../../utils';
import { handleMouseUpByBlurring } from '../../../../utils/focus';
import { UnstyledLink } from '../../../Button/BaseLink';
import { Icon } from '../../../Icon';
import { Text } from '../../../Text';
import styles from '../../ActionList.module.scss';

export type ItemProps = ActionListItemDescriptor;

export function Item({
  id,
  content,
  accessibilityLabel,
  helpText,
  url,
  onAction,
  onMouseEnter,
  icon,
  suffix,
  disabled,
  external,
  destructive,
  ellipsis,
  active,
  role,
}: ItemProps) {
  const className = cn(
    styles.Item,
    disabled && styles.disabled,
    destructive && styles.destructive,
    active && styles.active
  );

  let color: Color = 'default';
  if (destructive) {
    color = 'critical';
  } else if (active) {
    color = 'interactive';
  }

  let prefixMarkup: React.ReactNode | null = null;
  if (icon) {
    prefixMarkup = (
      <span className={styles.Prefix}>
        {<Icon source={icon} color={color} />}
      </span>
    );
  }

  const contentText = ellipsis && content ? `${content}…` : content;

  const contentMarkup = helpText ? (
    <>
      <div>{contentText}</div>
      <Text color="subdued" as="span">
        {helpText}
      </Text>
    </>
  ) : (
    contentText
  );

  const suffixMarkup = suffix && (
    <span className={cn(styles.Suffix, styles.Prefix)}>
      {<Icon source={suffix} color={color} />}
    </span>
  );

  const textMarkup = <span className={styles.Text}>{contentMarkup}</span>;

  const contentElement = (
    <div className="flex items-center gap-4">
      {prefixMarkup}
      {textMarkup}
      {suffixMarkup}
    </div>
  );

  const control = url ? (
    <UnstyledLink
      id={id}
      url={disabled ? '#' : url}
      className={className}
      external={external}
      aria-label={accessibilityLabel}
      onClick={onAction}
      role={role}
    >
      {contentElement}
    </UnstyledLink>
  ) : (
    <button
      id={id}
      type="button"
      className={className}
      disabled={disabled}
      aria-label={accessibilityLabel}
      onClick={(e) => {
        e.stopPropagation();
        onAction && onAction();
      }}
      onMouseUp={handleMouseUpByBlurring}
      role={role}
      onMouseEnter={onMouseEnter}
    >
      {contentElement}
    </button>
  );

  return <>{control}</>;
}

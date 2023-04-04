import { Flex } from '../../../Flex';
import { UnstyledLink } from '../../../Link/BaseLink';
import type { ActionListItemDescriptor } from '../../../../types/actionlist';
import { handleMouseUpByBlurring } from '../../../../utils/focus';
import cx from 'classnames';
import React from 'react';
import { Box } from '../../../Box';
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
  prefix,
  suffix,
  disabled,
  external,
  destructive,
  ellipsis,
  active,
  role,
}: ItemProps) {
  const className = cx(
    styles.Item,
    disabled && styles.disabled,
    destructive && styles.destructive,
    active && styles.active
  );

  let prefixMarkup: React.ReactNode | null = null;

  if (prefix) {
    prefixMarkup = <span className={styles.Prefix}>{prefix}</span>;
  } else if (icon) {
    prefixMarkup = <span className={styles.Prefix}>{icon}</span>;
  }

  const contentText = ellipsis && content ? `${content}…` : content;

  const contentMarkup = helpText ? (
    <>
      <Box>{contentText}</Box>
      <Text color="subdued" as="span">
        {helpText}
      </Text>
    </>
  ) : (
    contentText
  );

  const suffixMarkup = suffix && (
    <span className={cx(styles.Suffix, styles.Prefix)}>{suffix}</span>
  );

  const textMarkup = <span className={styles.Text}>{contentMarkup}</span>;

  const contentElement = (
    <Flex alignItems="center" gap="var(--space-4)">
      {prefixMarkup}
      {textMarkup}
      {suffixMarkup}
    </Flex>
  );

  // const scrollMarkup = active ? <ScrollTo /> : null;

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
      onClick={onAction}
      onMouseUp={handleMouseUpByBlurring}
      role={role}
      onMouseEnter={onMouseEnter}
    >
      {contentElement}
    </button>
  );

  return (
    <>
      {/* {scrollMarkup} */}
      {control}
    </>
  );
}

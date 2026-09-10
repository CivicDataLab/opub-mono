import React, { forwardRef, useId, useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { IconChevronRight, IconCircleCheckFilled } from '@tabler/icons-react';

import { DestructableAction, DisableableAction } from '../../types/button';
import { Color, IconProps } from '../../types/icon';
import { cn } from '../../utils';
import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import styles from './SectionCard.module.scss';

export interface SectionCardAction
  extends DisableableAction,
    DestructableAction {
  /** Icon shown as the header action. When set, `content` is used only as the accessible name */
  icon?: IconProps['source'];
  /** Visual style of a labelled action button when no `icon` is set */
  kind?: ButtonProps['kind'];
  /** Color treatment of a labelled action button when no `icon` is set */
  variant?: ButtonProps['variant'];
  /** Replaces the action label with a spinner when no `icon` is set */
  loading?: boolean;
  /** Stroke width of an icon action. Defaults to 1.5 */
  stroke?: number;
  /** Icon color token. Falls back to `critical` when `destructive` is true */
  color?: Color;
}

export interface SectionCardProps {
  /** Heading shown on the left of the header */
  title: React.ReactNode;
  /** Supporting copy shown under the title */
  description?: React.ReactNode;
  /** Body of the card. Hidden while collapsed when `expandable` is true */
  children?: React.ReactNode;
  /** Optional footer, typically action buttons. Hidden while collapsed */
  footer?: React.ReactNode;
  /** Buttons rendered to the right of the title and description */
  actions?: SectionCardAction[];
  /**
   * Success status shown on the right of the header when there are no `actions`.
   * Rendered with a check icon, e.g. "2 Files Ready".
   */
  successText?: React.ReactNode;
  /** Shows a chevron and lets the body and footer collapse */
  expandable?: boolean;
  /**
   * Open state when `expandable` is true and `expanded` is uncontrolled
   * @default true
   */
  defaultExpanded?: boolean;
  /** Controlled open state when `expandable` is true */
  expanded?: boolean;
  /** Called when the accordion open state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Accessible name for the expand/collapse control */
  expandAccessibilityLabel?: string;
  className?: string;
}

const SectionCard = forwardRef<HTMLElement, SectionCardProps>(
  (
    {
      title,
      description,
      children,
      footer,
      actions = [],
      successText,
      expandable = false,
      defaultExpanded = true,
      expanded,
      onExpandedChange,
      expandAccessibilityLabel,
      className,
    },
    ref
  ) => {
    const titleId = useId();
    const isControlled = expanded !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultExpanded);
    const open = expandable
      ? isControlled
        ? expanded
        : uncontrolledOpen
      : true;

    function handleOpenChange(next: boolean) {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onExpandedChange?.(next);
    }

    const hasDescription = Boolean(description);
    const hasBody = children != null && children !== false;
    const hasFooter = footer != null && footer !== false;
    const hasPanel = hasBody || hasFooter;
    const isCollapsed = expandable && !open;
    const collapseLabel =
      expandAccessibilityLabel ??
      (open ? 'Collapse section' : 'Expand section');

    const titleText = (
      <Text
        as={expandable ? 'span' : 'h3'}
        id={expandable ? undefined : titleId}
        variant="headingMd"
        color="highlight"
        className={styles.Title}
      >
        {title}
      </Text>
    );

    const header = (
      <div
        className={cn(styles.Header, !hasDescription && styles.isSingleLine)}
      >
        <div className={styles.Start}>
          {expandable ? (
            <h3 id={titleId} className={styles.TitleHeading}>
              <Collapsible.Trigger asChild>
                <button type="button" className={styles.TitleTrigger}>
                  <span className={styles.ChevronIcon}>
                    <Icon
                      source={IconChevronRight}
                      size={20}
                      color="subdued"
                    />
                  </span>
                  {titleText}
                  <Text visuallyHidden>{collapseLabel}</Text>
                </button>
              </Collapsible.Trigger>
            </h3>
          ) : (
            <div className={styles.TitleRow}>{titleText}</div>
          )}
          {description ? (
            <Text
              as="p"
              variant="bodySm"
              color="subdued"
              className={cn(expandable && styles.DescriptionIndented)}
            >
              {description}
            </Text>
          ) : null}
        </div>
        {actions.length > 0 ? (
          <div className={styles.Actions}>
            {actions.map((action, index) => (
              <SectionCardActionItem
                key={action.id ?? action.content ?? index}
                action={action}
              />
            ))}
          </div>
        ) : successText ? (
          <span className={styles.SuccessText}>
            <Icon source={IconCircleCheckFilled} size={16} color="success" />
            <Text as="span" variant="bodySm" color="success">
              {successText}
            </Text>
          </span>
        ) : null}
      </div>
    );

    const panel = hasPanel ? (
      <>
        {hasBody ? <div className={styles.Body}>{children}</div> : null}
        {hasFooter ? <div className={styles.Footer}>{footer}</div> : null}
      </>
    ) : null;

    const content = expandable ? (
      <Collapsible.Root
        className={styles.Collapsible}
        open={open}
        onOpenChange={handleOpenChange}
      >
        {header}
        {panel ? (
          <Collapsible.Content
            className={styles.Collapse}
            forceMount
            hidden={isCollapsed}
          >
            {panel}
          </Collapsible.Content>
        ) : null}
      </Collapsible.Root>
    ) : (
      <>
        {header}
        {panel}
      </>
    );

    return (
      <section
        ref={ref}
        className={cn(
          'opub-SectionCard',
          styles.Root,
          expandable && styles.isExpandable,
          isCollapsed && styles.isCollapsed,
          hasPanel && !isCollapsed && styles.hasOpenPanel,
          className
        )}
        aria-labelledby={titleId}
      >
        {content}
      </section>
    );
  }
);

SectionCard.displayName = 'SectionCard';

function SectionCardActionItem({ action }: { action: SectionCardAction }) {
  const {
    content,
    accessibilityLabel,
    icon,
    url,
    external,
    disabled,
    destructive,
    loading,
    onAction,
    kind = 'tertiary',
    variant,
    stroke = 1.5,
    color,
  } = action;

  const resolvedVariant = variant ?? (destructive ? 'critical' : 'basic');
  const label = accessibilityLabel ?? content;
  const iconColor =
    color ?? (destructive || resolvedVariant === 'critical' ? 'critical' : '');

  if (icon) {
    return (
      <IconButton
        icon={icon}
        disabled={disabled || loading}
        onClick={onAction}
        aria-label={label}
        stroke={stroke}
        {...(iconColor && { color: iconColor })}
        withTooltip={Boolean(label)}
        tooltipText={label}
      >
        {label}
      </IconButton>
    );
  }

  return (
    <Button
      url={url}
      external={external}
      disabled={disabled}
      loading={loading}
      kind={kind}
      variant={resolvedVariant}
      size="slim"
      onClick={onAction}
      accessibilityLabel={accessibilityLabel}
    >
      {content}
    </Button>
  );
}

export { SectionCard };

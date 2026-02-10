'use client';

import { LegacyRef } from 'react';
import * as TooltipRadix from '@radix-ui/react-tooltip';

import { TooltipProps, TooltipProviderProps } from '../../types/tooltip';
import { cn } from '../../utils';
import { Text } from '../Text';
import styles from './Tooltip.module.scss';

const Provider = ({
  globalDelayDuration,
  skipDelayDuration = 200,
  globalDisableHoverableContent = false,
  children,
  hasUnderline,
  ref,
}: TooltipProviderProps & { ref?: any }) => {
  const classname = cn(styles.Wrapper, hasUnderline && styles.HasUnderline);

  return (
    <main className={`opub-Tooltip ${classname}`} ref={ref}>
      <TooltipRadix.Provider
        delayDuration={globalDelayDuration}
        skipDelayDuration={skipDelayDuration}
        disableHoverableContent={globalDisableHoverableContent}
      >
        {children as any}
      </TooltipRadix.Provider>
    </main>
  );
};

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    content,
    open,
    defaultOpen,
    onOpenChange,
    delayDuration,
    disableHoverableContent,
    ariaLabel,
    onEscapeKeyDown,
    onPointerDownOutside,
    side = 'bottom',
    align,
    alignOffset,
    width = 'default',
    solo,
    hideArrow = false,
    sideOffset = hideArrow ? 2 : 4,
    className,
  } = props;

  if (!content) {
    return <>{children}</>;
  }

  const tooltipMarkup = (
    <TooltipRadix.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipRadix.Trigger className={cn(styles.Trigger, className)} asChild>
        {children as any}
      </TooltipRadix.Trigger>

      <TooltipRadix.Portal>
        <TooltipRadix.Content
          className={cn(styles.Content, width === 'wide' && styles.Wide)}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          aria-label={ariaLabel}
        >
          {typeof content === 'string' ? (
            <Text variant="bodyMd">{content}</Text>
          ) : (
            content
          )}
          {!hideArrow && (
            <TooltipRadix.Arrow fill="var(--surface-default)"></TooltipRadix.Arrow>
          )}
        </TooltipRadix.Content>
      </TooltipRadix.Portal>
    </TooltipRadix.Root>
  );

  if (solo) {
    return <TooltipRadix.Provider>{tooltipMarkup}</TooltipRadix.Provider>;
  }

  return tooltipMarkup;
};

Tooltip.Provider = Provider;

export { Tooltip };

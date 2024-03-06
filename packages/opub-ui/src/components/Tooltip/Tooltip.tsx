'use client';

import { forwardRef, LegacyRef } from 'react';
import * as TooltipRadix from '@radix-ui/react-tooltip';

import { TooltipProps, TooltipProviderProps } from '../../types/tooltip';
import { cn } from '../../utils';
import { Text } from '../Text';
import styles from './Tooltip.module.scss';

const Provider = forwardRef(
  (
    {
      globalDelayDuration,
      skipDelayDuration = 200,
      globalDisableHoverableContent = false,
      children,
      hasUnderline,
    }: TooltipProviderProps,
    ref: LegacyRef<HTMLDivElement>
  ) => {
    const classname = cn(styles.Wrapper, hasUnderline && styles.HasUnderline);

    return (
      <main className={`opub-Tooltip ${classname}`} ref={ref}>
        <TooltipRadix.Provider
          delayDuration={globalDelayDuration}
          skipDelayDuration={skipDelayDuration}
          disableHoverableContent={globalDisableHoverableContent}
        >
          {children}
        </TooltipRadix.Provider>
      </main>
    );
  }
);

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
        <span>{children}</span>
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
          <Text variant="bodyMd">{content}</Text>
          {!hideArrow && (
            <TooltipRadix.Arrow asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="var(--border-default)"
                fill="var(--surface-default)"
                stroke-linecap="round"
                stroke-linejoin="round"
                style={{
                  transform: 'rotate(180deg)',
                }}
                className="absolute left-0 top-[-10px] h-[28px] w-[22px]"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 15l6 -6l6 6" />
              </svg>
            </TooltipRadix.Arrow>
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

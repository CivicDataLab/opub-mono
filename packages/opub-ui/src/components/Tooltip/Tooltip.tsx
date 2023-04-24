'use client';

import { TooltipProps, TooltipProviderProps } from '../../types/tooltip';
import styles from './Tooltip.module.scss';
import * as TooltipRadix from '@radix-ui/react-tooltip';
import cx from 'classnames';
import { forwardRef, LegacyRef } from 'react';

const Provider = forwardRef(
  (
    {
      globalDelayDuration = 500,
      skipDelayDuration = 300,
      globalDisableHoverableContent = false,
      children,
      hasUnderline,
    }: TooltipProviderProps,
    ref: LegacyRef<HTMLDivElement>
  ) => {
    const classname = cx(styles.Wrapper, hasUnderline && styles.HasUnderline);

    return (
      <div className={`opub-Tooltip ${classname}`} ref={ref}>
        <TooltipRadix.Provider
          delayDuration={globalDelayDuration}
          skipDelayDuration={skipDelayDuration}
          disableHoverableContent={globalDisableHoverableContent}
        >
          {children}
        </TooltipRadix.Provider>
      </div>
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
    delayDuration = 500,
    disableHoverableContent,
    ariaLabel,
    onEscapeKeyDown,
    onPointerDownOutside,
    side = 'bottom',
    align,
    alignOffset,
    width = 'default',
    solo = true,
    hideArrow = false,
    sideOffset = hideArrow ? 2 : 4,
  } = props;

  const tooltipMarkup = (
    <TooltipRadix.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipRadix.Trigger className={styles.Trigger} asChild>
        <span>{children}</span>
      </TooltipRadix.Trigger>

      <TooltipRadix.Portal>
        <TooltipRadix.Content
          className={cx(styles.Content, width === 'wide' && styles.Wide)}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          aria-label={ariaLabel}
        >
          {content}
          {!hideArrow && <TooltipRadix.Arrow className={styles.Arrow} />}
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

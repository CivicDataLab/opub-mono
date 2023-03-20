import * as TooltipRadix from '@radix-ui/react-tooltip';
import { TooltipProps } from '@ui/types/tooltip';
import cx from 'classnames';
import { forwardRef } from 'react';
import styles from './Tooltip.module.scss';

const Tooltip = forwardRef((props: TooltipProps, ref: any) => {
  const {
    children,
    content,
    hasUnderline,
    globalDelayDuration = 500,
    skipDelayDuration = 300,
    globalDisableHoverableContent = false,
    open,
    defaultOpen,
    onOpenChange,
    delayDuration = 500,
    disableHoverableContent,
    ariaLabel,
    onEscapeKeyDown,
    onPointerDownOutside,
    side = 'bottom',
    sideOffset = 4,
    align,
    alignOffset,
    width = 'default',
  } = props;

  const classname = cx(styles.Wrapper, hasUnderline && styles.HasUnderline);

  return (
    <div className={`opub-Tooltip ${classname}`} ref={ref}>
      <TooltipRadix.Provider
        delayDuration={globalDelayDuration}
        skipDelayDuration={skipDelayDuration}
        disableHoverableContent={globalDisableHoverableContent}
      >
        <TooltipRadix.Root
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          delayDuration={delayDuration}
          disableHoverableContent={disableHoverableContent}
        >
          <TooltipRadix.Trigger className={styles.Trigger}>
            <>{children}</>
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
              <TooltipRadix.Arrow className={styles.Arrow} />
            </TooltipRadix.Content>
          </TooltipRadix.Portal>
        </TooltipRadix.Root>
      </TooltipRadix.Provider>
    </div>
  );
});

export { Tooltip };

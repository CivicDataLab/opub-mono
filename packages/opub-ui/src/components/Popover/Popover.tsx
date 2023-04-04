import * as Radix from '@radix-ui/react-popover';
import React from 'react';
import styles from './Popover.module.scss';
export interface PopoverProps extends Radix.PopoverContentProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  isPortal?: boolean;
  isArrow?: boolean;
}

interface DialogProps extends Radix.PopoverProps {
  Trigger?: Radix.PopoverTriggerProps;
  Content?: PopoverProps;
}

const Popover = ({ children, ...props }: DialogProps) => {
  return <Radix.Root {...props}>{children}</Radix.Root>;
};

export interface RadixButtonProps extends Radix.PopoverTriggerProps {}
const Trigger = ({ children, ...props }: RadixButtonProps) => {
  return (
    <Radix.Trigger {...props} asChild>
      {children}
    </Radix.Trigger>
  );
};

const Content = React.forwardRef(
  (
    { children, isPortal = true, isArrow = false, ...props }: PopoverProps,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    const PortalDom = isPortal ? Radix.Portal : React.Fragment;

    return (
      <PortalDom>
        <Radix.Content
          className={styles.Content}
          sideOffset={5}
          {...props}
          ref={forwardedRef}
        >
          {children}
          {isArrow && <Radix.Arrow />}
        </Radix.Content>
      </PortalDom>
    );
  }
);

Popover.Trigger = Trigger;
Popover.Content = Content;

export { Popover };

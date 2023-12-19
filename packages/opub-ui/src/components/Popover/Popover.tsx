'use client';

import { cn } from '../../utils';
import styles from './Popover.module.scss';
import * as Radix from '@radix-ui/react-popover';
import React from 'react';

export interface PopoverContentProps extends Radix.PopoverContentProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  isPortal?: boolean;
  isArrow?: boolean;
}

export interface PopoverProps extends Radix.PopoverProps {
  Trigger?: Radix.PopoverTriggerProps;
  Content?: PopoverContentProps;
}

const Popover = ({ children, ...props }: PopoverProps) => {
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
    {
      children,
      isPortal = true,
      isArrow = false,
      className,
      ...props
    }: PopoverContentProps,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    const PortalDom = isPortal ? Radix.Portal : React.Fragment;

    return (
      <PortalDom className={styles.Portal}>
        <Radix.Content
          className={cn(styles.Content, className)}
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

import * as Radix from '@radix-ui/react-popover';
import React from 'react';
import styles from './Popover.module.scss';
export interface Props extends Radix.PopoverProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  isPortal?: boolean;
  isArrow?: boolean;
}

export const Popover = Radix.Root;

export interface RadixButtonProps extends Radix.PopoverTriggerProps {}
export const Trigger = ({ children, ...props }: RadixButtonProps) => {
  return (
    <Radix.Trigger {...props} asChild>
      {children}
    </Radix.Trigger>
  );
};

export const Content = React.forwardRef(
  (
    { children, isPortal = true, isArrow = false, ...props }: Props,
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

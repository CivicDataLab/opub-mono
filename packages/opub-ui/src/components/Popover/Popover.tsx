import * as Radix from '@radix-ui/react-popover';
import React from 'react';

export interface Props extends Radix.PopoverProps {
  isPortal?: boolean;
}

export interface RadixButtonProps extends Radix.PopoverTriggerProps {}

export const Popover = Radix.Root;
export const Trigger = React.forwardRef(
  ({ children, ...props }: RadixButtonProps, forwardedRef) => {
    return (
      <Radix.Trigger {...props} asChild>
        {children}
      </Radix.Trigger>
    );
  }
);

export const Content = React.forwardRef(
  (
    { children, isPortal = true, ...props }: Props,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    const PortalDom = isPortal ? Radix.Portal : React.Fragment;

    return (
      <PortalDom>
        <Radix.Content sideOffset={5} {...props} ref={forwardedRef}>
          {children}
          <Radix.Arrow />
        </Radix.Content>
      </PortalDom>
    );
  }
);

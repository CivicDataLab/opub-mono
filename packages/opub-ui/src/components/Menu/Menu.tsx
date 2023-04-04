import React from 'react';
import { ActionList } from '../ActionList';
import type { ActionListProps } from '../ActionList/ActionList';
import { Popover } from '../Popover';
import { PopoverProps } from '../Popover/Popover';

type Props = {
  trigger: React.ReactNode;
} & ActionListProps &
  PopoverProps;

const Menu = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { trigger, side, align, ...others } = props;

  return (
    <Popover open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <Popover.Trigger
        onKeyDown={(e) => e.code === 'ArrowDown' && setIsOpen(true)}
      >
        {trigger}
      </Popover.Trigger>
      <Popover.Content side={side} align={align}>
        <ActionList actionRole="menuitem" {...others} />
      </Popover.Content>
    </Popover>
  );
};

export { Menu };

import React from 'react';
import { ActionList } from '../ActionList';
import type { ActionListProps } from '../ActionList/ActionList';
import { Popover } from '../Popover';

type Props = {
  trigger: React.ReactNode;
} & ActionListProps;

const Menu = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { trigger, ...others } = props;

  return (
    <Popover open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <Popover.Trigger
        onKeyDown={(e) => e.code === 'ArrowDown' && setIsOpen(true)}
      >
        {trigger}
      </Popover.Trigger>
      <Popover.Content>
        <ActionList actionRole="menuitem" {...others} />
      </Popover.Content>
    </Popover>
  );
};

export { Menu };

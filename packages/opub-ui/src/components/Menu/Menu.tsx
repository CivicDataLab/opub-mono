import React from 'react';
import { ActionList } from '../ActionList';
import type { ActionListProps } from '../ActionList/ActionList';
import { Popover } from '../Popover';
import type { PopoverContentProps, PopoverProps } from '../Popover';

type Props = {
  trigger: React.ReactNode;
} & ActionListProps &
  PopoverContentProps &
  PopoverProps;

const Menu = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const {
    trigger,
    open,
    onOpenChange,
    modal,
    items,
    sections,
    actionRole = 'menuitem',
    onActionAnyItem,
    ...others
  } = props;

  return (
    <Popover
      open={open ? open : isOpen}
      onOpenChange={onOpenChange ? onOpenChange : (e) => setIsOpen(e)}
      modal={modal}
    >
      <Popover.Trigger
        onKeyDown={(e) => e.code === 'ArrowDown' && setIsOpen(true)}
      >
        {trigger}
      </Popover.Trigger>
      <Popover.Content {...others}>
        <ActionList
          actionRole={actionRole}
          items={items}
          sections={sections}
          onActionAnyItem={onActionAnyItem}
        />
      </Popover.Content>
    </Popover>
  );
};

export { Menu };

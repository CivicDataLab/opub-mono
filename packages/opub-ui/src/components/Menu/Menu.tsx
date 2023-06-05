import { ActionList } from '../ActionList';
import type { ActionListProps } from '../ActionList/ActionList';
import { Popover } from '../Popover';
import type { PopoverContentProps, PopoverProps } from '../Popover';
import React from 'react';

type Props = {
  trigger: React.ReactNode;
  /** Content to be passed to the callback function */
  callbackContent?: any;
} & ActionListProps &
  PopoverContentProps &
  PopoverProps;

export const MenuContext = React.createContext(null);

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
    callbackContent,
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
        <MenuContext.Provider value={callbackContent}>
          <ActionList
            actionRole={actionRole}
            items={items}
            sections={sections}
            onActionAnyItem={onActionAnyItem}
          />
        </MenuContext.Provider>
      </Popover.Content>
    </Popover>
  );
};

export { Menu };

import React from 'react';
import type { ActionListProps } from '../ActionList/ActionList';
import { ActionList } from '../ActionList';
import { Content, Popover, Trigger } from '../Popover';

type Props = {
  trigger: React.ReactNode;
} & ActionListProps;

const Menu = (props: Props) => {
  const { trigger, ...others } = props;

  return (
    <Popover>
      <Trigger>{trigger}</Trigger>
      <Content>
        <ActionList actionRole="menuitem" {...others} />
      </Content>
    </Popover>
  );
};

export { Menu };

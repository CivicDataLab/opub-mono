import { ActionList, ActionListProps } from '../../../ActionList';
import { Icon } from '../../../Icon';
import { IconButton } from '../../../IconButton';
import { Popover } from '../../../Popover';
import {
  IconCopy,
  IconDotsVertical,
  IconEdit,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';

function handleRowAction(event: React.MouseEvent<HTMLButtonElement>) {
  event.stopPropagation();
}

export function RowAction({
  rowActions,
}: {
  rowActions: ActionListProps['items'];
}) {
  return (
    <>
      <Popover>
        <Popover.Trigger>
          <IconButton
            icon={IconDotsVertical}
            size="slim"
            onClick={(e) => handleRowAction(e)}
          >
            Row Action
          </IconButton>
        </Popover.Trigger>
        <Popover.Content>
          <ActionList actionRole="menuitem" items={rowActions} />
        </Popover.Content>
      </Popover>
    </>
  );
}

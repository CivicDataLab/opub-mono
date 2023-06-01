import { ActionListProps } from '../../../ActionList';
import { IconButton } from '../../../IconButton';
import { Menu } from '../../../Menu';
import { IconDotsVertical } from '@tabler/icons-react';

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
      <Menu
        items={rowActions}
        trigger={
          <IconButton
            icon={IconDotsVertical}
            size="slim"
            onClick={(e) => handleRowAction(e)}
          >
            Row Action
          </IconButton>
        }
      />
    </>
  );
}

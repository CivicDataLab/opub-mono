import { ActionListProps } from '../../../ActionList';
import { IconButton } from '../../../IconButton';
import { Menu } from '../../../Menu';
import { IconDotsVertical } from '@tabler/icons-react';

export function RowAction({
  rowActions,
  row,
}: {
  rowActions: ActionListProps['items'];
  row: any;
}) {
  return (
    <>
      <Menu
        items={rowActions}
        align="end"
        callbackContent={row}
        trigger={
          <IconButton
            icon={IconDotsVertical}
            size="slim"
            onClick={(e) => e.stopPropagation()}
          >
            Row Action
          </IconButton>
        }
      />
    </>
  );
}

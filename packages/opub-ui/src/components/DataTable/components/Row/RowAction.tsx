import { ActionListProps } from '../../../ActionList';
import { IconButton } from '../../../IconButton';
import { Menu } from '../../../Menu';
import { IconDotsVertical } from '@tabler/icons-react';

export function RowAction({
  rowActions,
  callbackContent,
}: {
  rowActions: ActionListProps['items'];
  callbackContent: any;
}) {
  return (
    <>
      <Menu
        items={rowActions}
        align="end"
        callbackContent={callbackContent}
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

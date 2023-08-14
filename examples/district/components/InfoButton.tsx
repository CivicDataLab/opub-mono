import { IconButton, Popover } from 'opub-ui';

import Icons from './icons';

export const InfoButton = () => {
  return (
    <Popover>
      <Popover.Trigger>
        <IconButton color="subdued" icon={Icons.info}>
          open info
        </IconButton>
      </Popover.Trigger>
      <Popover.Content>
        <div>content</div>
      </Popover.Content>
    </Popover>
  );
};

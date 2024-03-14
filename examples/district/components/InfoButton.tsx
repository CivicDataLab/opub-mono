import { IconButton, Popover, Text } from 'opub-ui';

import Icons from './icons';

export const InfoButton = ({ children }: any) => {
  return (
    <Popover>
      <Popover.Trigger>
        <IconButton color="subdued" icon={Icons.info}>
          open info
        </IconButton>
      </Popover.Trigger>
      <Popover.Content>
        <div className="rounded-2 p-2 shadow-shadowModal">
          <Text variant="bodyMd">{children}</Text>
        </div>
      </Popover.Content>
    </Popover>
  );
};

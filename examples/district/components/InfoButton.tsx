import Icons from './icons';
import { IconButton, Popover, Text } from 'opub-ui';

export const InfoButton = ({ children }: any) => {
  return (
    <Popover>
      <Popover.Trigger>
        <IconButton color="subdued" icon={Icons.info}>
          open info
        </IconButton>
      </Popover.Trigger>
      <Popover.Content>
        <div className="p-2 rounded-2 shadow-modal">
          <Text variant="bodyMd">{children}</Text>
        </div>
      </Popover.Content>
    </Popover>
  );
};

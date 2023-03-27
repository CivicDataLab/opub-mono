import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Dialog } from './AlertDialog';

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/alert-dialog
 */
const meta = {
  component: Dialog.Content,
} satisfies Meta<typeof Dialog.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Dialog>
        <Dialog.Trigger>
          <Button>Discard Changes</Button>
        </Dialog.Trigger>
        <Dialog.Content {...args} />
      </Dialog>
    );
  },
  args: {
    title: 'Dialog Title',
    children: 'Are you sure you want to discard all of your notes?',
    primaryAction: {
      content: 'Yes, discard',
      onAction: () => console.log('discard'),
      destructive: true,
    },
    secondaryActions: [
      {
        content: 'No, keep changes',
        onAction: () => console.log('no'),
      },
    ],
  },
};

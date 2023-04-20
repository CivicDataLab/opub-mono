import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { AlertDialog } from './AlertDialog';
/**
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/alert-dialog
 */
const meta = {
  component: AlertDialog.Content,
} satisfies Meta<typeof AlertDialog.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <AlertDialog>
        <AlertDialog.Trigger>
          <Button>Discard Changes</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content {...args} />
      </AlertDialog>
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

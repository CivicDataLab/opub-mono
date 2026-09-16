import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { AlertDialog } from './AlertDialog';

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/alert-dialog
 */
const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog.Content,
} satisfies Meta<typeof AlertDialog.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <AlertDialog>
        <AlertDialog.Trigger>
          <Button>Delete dataset</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content {...args} />
      </AlertDialog>
    );
  },
  args: {
    title: 'Delete dataset?',
    children:
      'Deleting "State Climate Risk & Vulnerability Indicators (2025)" will permanently remove it from My Workspace. This action cannot be undone.',
    primaryAction: {
      content: 'Delete Dataset',
      onAction: () => console.log('delete'),
      destructive: true,
    },
    secondaryActions: [
      { content: 'Cancel', onAction: () => console.log('cancel') },
    ],
  },
};

export const Confirm: Story = {
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
    title: 'Discard changes?',
    children: 'Are you sure you want to discard all of your notes?',
    primaryAction: {
      content: 'Discard',
      onAction: () => console.log('discard'),
      destructive: true,
    },
    secondaryActions: [
      { content: 'Keep editing', onAction: () => console.log('keep') },
    ],
  },
};

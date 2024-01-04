import { Button } from '../Button';
import { toast } from './Toast';
import { Meta, StoryObj } from '@storybook/react';

/**
 * A succinct message that is displayed temporarily.
 *
 * Reference: https://ui.shadcn.com/docs/components/sonner
 */
const meta = {
  title: 'Components/Sonner',
  component: toast,
} satisfies Meta<typeof toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <>
        <Button
          onClick={() => {
            toast('Event has been created', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            });
          }}
        >
          Trigger Toast
        </Button>
      </>
    );
  },
  // @ts-ignore
  args: {},
};

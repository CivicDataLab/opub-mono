import { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

/**
 * Badge Description
 *
 * Reference: #
 */
const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    progress: 'default',
    status:'new'
  },
};

export const Complete: Story = {
  args: {
    children: 'Complete',
    progress: 'complete',
    status:'info'
  },
};

export const Partiallycomplete: Story = {
  args: {
    children: 'Partially complete',
    progress: 'partiallyComplete',
    status:'info'
  },
};

export const Incomplete: Story = {
  args: {
    children: 'Incomplete',
    progress: 'incomplete',
    status:'info'
  },
};
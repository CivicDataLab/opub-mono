import { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';

/**
 * Badges are used to inform user of the status of an object or of an action that’s been taken.
 *
 *  Reference: https://polaris.shopify.com/components/feedback-indicators/badge
 */

const meta = {
  title: 'Components/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    progress: 'default',
    status: 'new',
  },
};

export const Complete: Story = {
  args: {
    children: 'Complete',
    progress: 'complete',
    status: 'info',
  },
};

export const Partiallycomplete: Story = {
  args: {
    children: 'Partially complete',
    progress: 'partiallyComplete',
    status: 'info',
  },
};

export const Incomplete: Story = {
  args: {
    children: 'Incomplete',
    progress: 'incomplete',
    status: 'info',
  },
};

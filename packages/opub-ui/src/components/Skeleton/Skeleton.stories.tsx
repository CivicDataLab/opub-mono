import { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

/**
 * Skeleton Description
 *
 * Reference: #
 */
const meta = {
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Skeleton',
  },
};
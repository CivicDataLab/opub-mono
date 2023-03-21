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
    children: 'Badge',
  },
};
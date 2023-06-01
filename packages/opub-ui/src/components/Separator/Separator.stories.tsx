import { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

/**
 * Separator Description
 *
 * Reference: #
 */
const meta = {
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Separator',
  },
};
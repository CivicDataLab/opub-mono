import { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

/**
 * Box Description
 *
 * Reference: #
 */
const meta = {
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Box',
  },
};
import { Meta, StoryObj } from '@storybook/react';

import { Drawer } from './Drawer';

/**
 * Drawer Description
 *
 * Reference: #
 */
const meta = {
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Drawer',
  },
};
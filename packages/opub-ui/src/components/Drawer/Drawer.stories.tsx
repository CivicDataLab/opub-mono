import { Meta, StoryObj } from '@storybook/react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { Drawer } from './Drawer';

/**
 * Drawer Description
 *
 * Reference: #
 */
const meta = {
  title: 'Components/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Drawer',
  },
};

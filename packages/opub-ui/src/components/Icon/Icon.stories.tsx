import { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

/**
 * Icon Description
 *
 * Reference: #
 */
const meta = {
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Icon',
  },
};
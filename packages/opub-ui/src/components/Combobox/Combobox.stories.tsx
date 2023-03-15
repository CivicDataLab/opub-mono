import { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox';

/**
 * Combobox Description
 *
 * Reference: #
 */
const meta = {
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Combobox',
  },
};
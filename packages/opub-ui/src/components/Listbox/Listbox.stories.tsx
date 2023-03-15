import { Meta, StoryObj } from '@storybook/react';
import { Listbox } from './Listbox';

/**
 * Listbox Description
 *
 * Reference: #
 */
const meta = {
  component: Listbox,
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Listbox',
  },
};
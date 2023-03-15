import { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';

/**
 * Autocomplete Description
 *
 * Reference: #
 */
const meta = {
  component: Autocomplete,
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Autocomplete',
  },
};
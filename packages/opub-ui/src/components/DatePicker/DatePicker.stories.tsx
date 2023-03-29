import { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

/**
 * DatePicker Description
 *
 * Reference: #
 */
const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Date Picker',
  },
};

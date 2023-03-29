import { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

/**
 * A date picker combines a DateField and a Calendar popover to allow users to enter or select a date and time value.
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useDatePicker.html
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

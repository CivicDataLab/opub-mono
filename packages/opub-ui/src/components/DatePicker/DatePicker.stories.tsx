import { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';

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

const metaRange = {
  component: DateRangePicker,
} satisfies Meta<typeof DateRangePicker>;
type StoryRange = StoryObj<typeof metaRange>;

export const Default: Story = {
  args: {
    label: 'Date Picker',
  },
};

export const Range: StoryRange = {
  render: ({ ...args }) => <DateRangePicker {...args} />,
  args: {
    label: 'Date Range Picker',
  },
};

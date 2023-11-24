import { DateField } from './DateField';
import { now, getLocalTimeZone } from '@internationalized/date';
import { Meta, StoryObj } from '@storybook/react';

/**
 * DateFields allow users to enter and edit date and time values using a keyboard
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useDateField.html
 */
const meta = {
  title: 'Verified/DateField',
  component: DateField,
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Date Field',
  },
};

export const DateTime: Story = {
  args: {
    label: 'Date and Time',
    placeholderValue: now(getLocalTimeZone()),
  },
};

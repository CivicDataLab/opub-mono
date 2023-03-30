import { Meta, StoryObj } from '@storybook/react';
import { TimeField } from './TimeField';
import { now, getLocalTimeZone } from '@internationalized/date';

/**
 * TimeFields allow users to enter and edit time values using a keyboard
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useTimeField.html
 */
const meta = {
  component: TimeField,
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const LocalTime: Story = {
  args: {
    label: 'Date and Time',
    placeholderValue: now(getLocalTimeZone()),
  },
};

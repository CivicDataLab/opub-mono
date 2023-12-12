import { TimeField } from './TimeField';
import { now, getLocalTimeZone, Time } from '@internationalized/date';
import { Meta, StoryObj } from '@storybook/react';

/**
 * TimeFields allow users to enter and edit time values using a keyboard
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useTimeField.html
 */
const meta = {
  title: 'Components/TimeField',
  component: TimeField,
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Time',
  },
};

export const LocalTime: Story = {
  args: {
    label: 'Date and Time',
    placeholderValue: now(getLocalTimeZone()),
  },
};
export const MinMax: Story = {
  args: {
    label: 'With Constraints',
    minValue: new Time(9),
    maxValue: new Time(17),
    defaultValue: new Time(8),
    errorMessage: 'Must be between 9am and 5pm',
  },
};

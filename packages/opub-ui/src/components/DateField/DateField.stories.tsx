import { Meta, StoryObj } from '@storybook/react';
import { DateField } from './DateField';

/**
 * DateFields allow users to enter and edit date and time values using a keyboard
 *
 * Reference: https://react-spectrum.adobe.com/react-spectrum/DateField.html
 */
const meta = {
  component: DateField,
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // children: 'DateField',
  },
};

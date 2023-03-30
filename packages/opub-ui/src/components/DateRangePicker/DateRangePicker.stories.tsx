import { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from './DateRangePicker';

/**
 * DateRangePicker Description
 *
 * Reference: #
 */
const meta = {
  component: DateRangePicker,
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'DateRangePicker',
  },
};
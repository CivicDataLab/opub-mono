import { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

/**
 * A calendar displays one or more date grids and allows users to select a single date.
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useCalendar.html
 */
const meta = {
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

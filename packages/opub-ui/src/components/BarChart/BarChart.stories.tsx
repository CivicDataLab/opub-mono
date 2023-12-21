import { BarChart } from './BarChart';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Bar Charts are used to visually represent quantitative and categorical data.
 */
const meta = {
  title: 'Visualizations/BarChart',
  component: BarChart,
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      {
        name: 'Sales',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  },
};

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

export const yAxis: Story = {
  name: 'yAxis',
  args: {
    yAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      {
        name: 'Sales',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
    height: '500px',
  },
};

export const Grouped: Story = {
  args: {
    yAxis: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
    series: [
      {
        name: '2011',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230],
      },
      {
        name: '2012',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807],
      },
    ],
    height: '500px',
  },
};

import { Meta, StoryObj } from '@storybook/react-vite';

import { BarChart } from './BarChart';

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
    options: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    },
  },
};

export const yAxis: Story = {
  name: 'yAxis',
  args: {
    options: {
      yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      xAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    },
    height: '500px',
  },
};

export const Grouped: Story = {
  args: {
    options: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Profit', 'Expenses', 'Income'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'value',
        },
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {
            show: false,
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      ],
      series: [
        {
          name: 'Profit',
          type: 'bar',
          label: {
            show: true,
            position: 'inside',
          },
          emphasis: {
            focus: 'series',
          },
          data: [200, 170, 240, 244, 200, 220, 210],
        },
        {
          name: 'Income',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [320, 302, 341, 374, 390, 450, 420],
        },
        {
          name: 'Expenses',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'left',
          },
          emphasis: {
            focus: 'series',
          },
          data: [-120, -132, -101, -134, -190, -230, -210],
        },
      ],
    },
    height: '500px',
  },
};

const option = {
  title: {
    text: 'Stacked Line',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};
export const Line: Story = {
  args: {
    options: option,
    height: '500px',
  },
};
const data = {
  xAxis: {
    data: [
      'Aug 2023',
      'Jul 2023',
      'Jun 2023',
      'May 2023',
      'Apr 2023',
      'Mar 2023',
      'Feb 2023',
      'Jan 2023',
      'Dec 2022',
      'Nov 2022',
      'Oct 2022',
      'Sep 2022',
      'Aug 2022',
      'Jul 2022',
      'Jun 2022',
      'May 2022',
      'Apr 2022',
      'Mar 2022',
      'Feb 2022',
      'Jan 2022',
      'Dec 2021',
      'Nov 2021',
      'Oct 2021',
      'Sep 2021',
      'Aug 2021',
      'Jul 2021',
      'Jun 2021',
      'May 2021',
      'Apr 2021',
    ],
  },
  yAxis: {
    type: 'value',
    minInterval: 1,
  },
  legend: {
    data: ['Dhubri', 'Tinsukia'],
  },
  series: [
    {
      data: [
        2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3,
        4, 1, 2, 3, 3,
      ],
      type: 'line',
      name: 'Dhubri',
      color: '#5470c6',
    },
    {
      data: [
        1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1,
        1, 1, 2, 2, 2,
      ],
      type: 'line',
      name: 'Tinsukia',
      color: '#91cc75',
    },
  ],
};
export const LineSmooth: Story = {
  args: {
    options: data,
    height: '500px',
  },
};

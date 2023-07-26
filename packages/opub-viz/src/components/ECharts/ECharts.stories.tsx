import { ECharts } from './ECharts';
import { Meta } from '@storybook/react';
import React from 'react';

/**
 * ECharts component accepts props from OPub backend and renders the chart.
 */
const meta = {
  component: ECharts,
} satisfies Meta<typeof ECharts>;

export default meta;

export const Default = {
  render: ({ ...args }) => {
    const [options, setOptions] = React.useState({});

    React.useEffect(() => {
      async function fetchOptions() {
        const options = await fetch(
          'https://opub-viz.civicdatalab.in/viz/chart/'
        ).then((res) => res.json());
        setOptions(options.data);
      }

      fetchOptions();
    }, []);

    return <ECharts {...args} option={options} />;
  },

  parameters: { docs: { source: { type: 'code' } } },
};

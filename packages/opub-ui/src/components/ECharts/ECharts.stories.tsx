import React from 'react';
import { Meta } from '@storybook/react-vite';
import { IconLinkOff } from '@tabler/icons-react';

import { ECharts } from './ECharts';

/**
 * ECharts component accepts props from OPub backend and renders the chart.
 */
const meta = {
  title: 'Visualizations/ECharts',
  component: ECharts,
} satisfies Meta<typeof ECharts>;

export default meta;

export const Default = {
  render: ({ ...args }) => {
    const [options, setOptions] = React.useState({});
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
      async function fetchOptions() {
        const options = await fetch(
          'https://opub-viz.civicdatalab.in/viz/chart/'
        )
          .then((res) => res.json())
          .catch(() => setError(true));
        setOptions(options.data);
      }

      fetchOptions();
    }, []);

    if (error) {
      return (
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <IconLinkOff size={32} />
            Error while fetching chart data
          </div>
        </div>
      );
    }

    return <ECharts {...args} option={options} />;
  },
};

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { features } from '../../../assets/json/assam.json';
import MapChart from './MapChart';

/**
 * Map charts are commonly used to compare values and show categories across geographical regions, and are best utilized when the data contains geographic information.
 */
const meta = {
  title: 'Visualizations/MapChart',
  component: MapChart,
  argTypes: {
    defaultLayer: {
      control: 'select',
      options: ['satellite', 'light', 'dark'],
      description: 'theme of the map',
    },
  },
} satisfies Meta<typeof MapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const legendData = [
  {
    label: '331+',
    color: '#a50f15',
  },
  {
    label: '326 - 330',
    color: '#de2d26',
  },
  {
    label: '321 - 325',
    color: '#fb6a4a',
  },
  {
    label: '316 - 320',
    color: '#fc9272',
  },
  {
    label: '311 - 315',
    color: '#fcbba1',
  },
  {
    label: '0 - 310',
    color: '#fee5d9',
  },
];

const mapDataFn = (value: number) => {
  return value >= 330
    ? '#a50f15'
    : value >= 325
      ? '#de2d26'
      : value >= 320
        ? '#fb6a4a'
        : value >= 315
          ? '#fc9272'
          : value >= 310
            ? '#fcbba1'
            : '#fee5d9';
};

const legendHeading = {
  heading: 'Districts',
  subheading: 'Average Rainfall (mm)',
};

export const Default: Story = {
  render: (args) => {
    if (!features) return <div>Loading...</div>;

    return (
      <div style={{ height: '600px' }}>
        <MapChart {...args} />
      </div>
    );
  },
  args: {
    features,
    legendData,
    mapDataFn,
    mapProperty: 'dt_code',
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    legendHeading,
  },
};

export const Popup: Story = {
  render: (args) => {
    const [map, setMap] = React.useState<any>(null);

    if (!features) return <div>Loading...</div>;
    if (map) {
      map.eachLayer((layer: any) => {
        const district = layer.feature?.properties.district;
        if (district === 'Nagaon' || district === 'Sonitpur') {
          layer
            .bindPopup(
              () => {
                return `<span> 
								${district} <br />
								Rainfall: ${layer.feature?.properties.dt_code}
									</span>`;
              },
              {
                maxWidth: 200,
                closeButton: false,
                autoClose: false,
                closeOnEscapeKey: false,
                closeOnClick: false,
                className: 'opub-leaflet-popup',
              }
            )
            .openPopup();
        }
      });
    }

    return (
      <div style={{ height: '600px' }}>
        <MapChart {...args} setMap={setMap} />
      </div>
    );
  },
  args: {
    features,
    legendData,
    mapDataFn,
    mapProperty: 'dt_code',
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    legendHeading,
  },
};

export const OnlyMap: Story = {
  render: (args) => {
    if (!features) return <div>Loading...</div>;

    return (
      <div style={{ height: '600px' }}>
        <MapChart {...args} />
      </div>
    );
  },
  args: {
    features,
    mapDataFn,
    mapProperty: 'dt_code',
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    legendHeading,
    hideScale: true,
    fullScreen: false,
  },
};

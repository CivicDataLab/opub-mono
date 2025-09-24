import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import * as d3 from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';

import { features as assamFeatures } from '../../../assets/json/assam.json';
import himachalRiverFeatures from '../../../assets/json/hp_rivers.json';
import { features as himachalFeatures } from '../../../assets/json/hp.json';
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

const hpMapDataFn = (value: number) => {
  return value >= 3
    ? '#a50f15'
    : value >= 3
      ? '#de2d26'
      : value >= 2
        ? '#fb6a4a'
        : value >= 1
          ? '#fc9272'
          : value >= 0
            ? '#fcbba1'
            : '#fee5d9';
};

const addlFeaturesStyleArray = [
  {
    // Style for addl layer
    weight: 1.5,
    opacity: 1,
    color: '#7bd4ef',
    fillOpacity: 1,
  },
];

const legendHeading = {
  heading: 'Districts',
  subheading: 'Average Rainfall (mm)',
};

const values: number[] = [];
const customLegendData = [];
for (let i = 0; i < assamFeatures.length; i++) {
  if (assamFeatures[i].properties['dt_code'] == null) continue;
  values.push(Number(assamFeatures[i].properties['dt_code']));
}

// Set the sequential scale properties
const colorScale = d3
  .scaleSequential()
  .domain([Math.min(...values), Math.max(...values)])
  .interpolator(interpolateBlues);

const min = Math.min(...values);
const max = Math.max(...values);
const step = (max - min) / 3;
const grades = Array.from({ length: 3 + 1 }, (_, i) => min + step * i);

for (let i = 0; i < grades.length; i++) {
  const from = grades[i];
  const to = grades[i + 1] || Math.max(...values);

  customLegendData.push({
    color: colorScale(from),
    label: `${Math.round(from)} - ${to ? `${Math.round(to)}` : '+'}`,
  });
}

export const Default: Story = {
  render: (args) => {
    if (!assamFeatures) return <div>Loading...</div>;

    return (
      <div style={{ height: '600px' }}>
        <MapChart {...args} />
      </div>
    );
  },
  args: {
    features: assamFeatures,
    mapDataFn,
    mapProperty: 'dt_code',
    legendData,
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    legendHeading,
    horizontalLegend: true,
    // height: 200,
  },
};

export const SequentialScale: Story = {
  render: (args) => {
    if (!assamFeatures) return <div>Loading...</div>;

    return (
      <div style={{ height: '600px' }}>
        <MapChart {...args} />
      </div>
    );
  },
  args: {
    features: assamFeatures,
    isCustomColor: true,
    customColor: colorScale,
    legendData: customLegendData,
    mapDataFn,
    mapProperty: 'dt_code',
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    legendHeading,
    horizontalLegend: true,
  },
};

export const Popup: Story = {
  render: (args) => {
    const [map, setMap] = React.useState<any>(null);

    if (!assamFeatures) return <div>Loading...</div>;
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
                maxWidth: 300,
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
    features: assamFeatures,
    legendData,
    mapDataFn,
    mapProperty: 'dt_code',
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    legendHeading,
    fullScreen: true,
  },
};

export const zoomReset: Story = {
  render: (args) => {
    if (!assamFeatures) return <div>Loading...</div>;

    return (
      <div style={{ height: '600px' }}>
        <MapChart {...args} />
      </div>
    );
  },
  args: {
    features: assamFeatures,
    mapDataFn,
    mapProperty: 'dt_code',
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    legendHeading,
    legendData,
    resetZoom: true,
  },
};

export const OnlyMap: Story = {
  render: (args) => {
    if (!assamFeatures) return <div>Loading...</div>;

    return (
      <div style={{ height: '600px' }}>
        <MapChart {...args} />
      </div>
    );
  },
  args: {
    features: assamFeatures,
    mapDataFn,
    mapProperty: 'dt_code',
    mapZoom: 7.9,
    fillOpacity: 1,
    mapCenter: [26.193, 92.3],
    hideScale: true,
  },
};

export const AdditionalMapData: Story = {
  render: (args) => {
    if (!himachalFeatures) return <div>Loading...</div>;

    return (
      <div style={{ height: '600px' }}>
        <MapChart {...args} />
      </div>
    );
  },
  args: {
    features: himachalFeatures,
    addlFeaturesArray: himachalRiverFeatures,
    addlFeaturesStyleArray,
    mapDataFn: hpMapDataFn,
    mapProperty: 'risk-score',
    mapZoom: 7.5,
    fillOpacity: 0.8,
    mapCenter: [31.925, 77.248],
    // hideScale: true,
    legendHeading,
    legendData,
    resetZoom: true,
  },
};

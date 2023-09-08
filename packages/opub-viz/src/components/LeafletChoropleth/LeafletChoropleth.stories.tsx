import { features } from '../../../assets/json/assam.json';
import { LeafletChoropleth } from './LeafletChoropleth';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Map charts are commonly used to compare values and show categories across geographical regions, and are best utilized when the data contains geographic information.
 */
const meta = {
  component: LeafletChoropleth,
  argTypes: {
    defaultLayer: {
      control: 'select',
      options: [
        'light_all',
        'light_nolabels',
        'dark_all',
        'dark_nolabels',
        'rastertiles/voyager',
        'rastertiles/voyager_nolabels',
      ],
      description: 'theme of the map',
    },
  },
} satisfies Meta<typeof LeafletChoropleth>;

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

export const Default: Story = {
  render: (args) => {
    if (!features) return <div>Loading...</div>;

    return (
      <div style={{ height: '600px' }}>
        <LeafletChoropleth {...args} />
      </div>
    );
  },
  args: {
    features,
    legendData,
    mapDataFn,
    mapProperty: 'dt_code',
    defaultLayer: 'dark_all',
    mapZoom: 7.4,
  },
};

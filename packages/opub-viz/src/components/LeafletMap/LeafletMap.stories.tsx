import mapFile from '../../../assets/json/assam.json';
import { LeafletMap } from './LeafletMap';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Map charts are commonly used to compare values and show categories across geographical regions, and are best utilized when the data contains geographic information.
 */
const meta = {
  component: LeafletMap,
} satisfies Meta<typeof LeafletMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    if (!mapFile) return <div>Loading...</div>;
    const dataFile = mapFile.features.map((feature: any) => {
      return {
        name: feature.properties.district,
        value: Math.round(Math.random() * 1000),
      };
    });

    return (
      <div style={{ height: '600px' }}>
        <LeafletMap />
      </div>
    );
  },
  args: {
    mapFile,
    mapName: 'bihar',
    nameProperty: 'district',
  },
};

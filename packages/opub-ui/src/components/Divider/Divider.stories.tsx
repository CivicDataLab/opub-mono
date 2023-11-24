import { Divider } from './Divider';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Use to separate or group content
 */
const meta = {
  title: 'Verified/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Veritcal: Story = {
  render: () => (
    <div style={{ height: '300px' }}>
      <Divider direction="vertical" />
    </div>
  ),
};

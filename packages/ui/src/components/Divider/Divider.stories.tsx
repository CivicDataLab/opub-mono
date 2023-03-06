import { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

/**
 * Use to separate or group content
 */
const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    borderStyle: 'divider',
  },
};

export const Base: Story = {
  args: {
    borderStyle: 'base',
  },
};

export const Dark: Story = {
  args: {
    borderStyle: 'dark',
  },
};

export const DividerOnDark: Story = {
  args: {
    borderStyle: 'divider-on-dark',
  },
};

export const Transparent: Story = {
  args: {
    borderStyle: 'transparent',
  },
};

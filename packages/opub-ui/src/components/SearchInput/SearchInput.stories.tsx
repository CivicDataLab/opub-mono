import { SearchInput } from './SearchInput';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Search Input Component made from Input and IconButton
 */
const meta = {
  component: SearchInput,
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'Search',
    onChange: (e) => {
      console.log('onChange', e);
    },
    onSubmit: (e) => {
      console.log('onSubmit', e);
    },
  },
};

export const WithButton: Story = {
  args: {
    defaultValue: 'Search',
    onChange: (e) => {
      console.log('onChange', e);
    },
    onSubmit: (e) => {
      console.log('onSubmit', e);
    },
    withButton: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Search',
    onChange: (e) => {
      console.log('onChange', e);
    },
    onSubmit: (e) => {
      console.log('onSubmit', e);
    },
    withButton: true,
    disabled: true,
  },
};

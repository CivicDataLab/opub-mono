import { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';
import { Box } from '../Box';
import { Combobox } from './Combobox';

/**
 * Combobox is an accessible autocomplete input that enables users to filter a list of options and select one or more values.
 *
 * Reference: https://www.downshift-js.com/use-combobox
 */
const meta = {
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'rustic', label: 'Rustic' },
  { value: 'antique', label: 'Antique' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'refurbished', label: 'Refurbished' },
];

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Box maxWidth="480px">
        <Combobox {...args} />
      </Box>
    );
  },

  args: {
    label: 'Pick a category',
    allItems: options,
  },
};

export const MultiSelect: Story = {
  ...Default,
  args: {
    label: 'Pick a category',
    allItems: options,
    allowMultiple: true,
    initialSelectedItems: [options[0]],
  },
};

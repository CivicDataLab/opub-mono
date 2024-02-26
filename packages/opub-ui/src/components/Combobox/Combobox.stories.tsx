import { Meta, StoryObj } from '@storybook/react';

import { Combobox } from './Combobox';

/**
 * Combobox is an accessible autocomplete input that enables users to filter a list of options and select one or more values.
 *
 * Reference: https://ariakit.org/examples/combobox-multiple
 */
const meta = {
  title: 'Components/Combobox',
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: {
  value: string;
  label: string;
}[] = [
  {
    value: 'Apple',
    label: 'Apple',
  },
  {
    value: 'Banana',
    label: 'Banana',
  },
  {
    value: 'Burger',
    label: 'Burger',
  },
  {
    value: 'Cherry',
    label: 'Cherry',
  },
  {
    value: 'Grapes',
    label: 'Grapes',
  },
  {
    value: 'Mango',
    label: 'Mango',
  },
  {
    value: 'Orange',
    label: 'Orange',
  },
  {
    value: 'Pineapple',
    label: 'Pineapple',
  },
  {
    value: 'Strawberry',
    label: 'Strawberry',
  },
  {
    value: 'Watermelon',
    label: 'Watermelon',
  },
];

export const Default: Story = {
  args: {
    label: 'Your favorite food',
    placeholder: 'e.g., Apple, Burger',
    list: options,
  },
};

export const MultiSelect: Story = {
  args: {
    label: 'Your favorite food',
    placeholder: 'e.g., Apple, Burger',
    list: options,
    selectedValue: [],
  },
};

export const DisplaySelected: Story = {
  args: {
    label: 'Your favorite food',
    placeholder: 'e.g., Apple, Burger',
    list: options,
    displaySelected: true,
    selectedValue: ['Apple'],
  },
};

export const Grouping: Story = {
  args: {
    label: 'Select an Item',
    placeholder: 'e.g., Apple, Red',
    list: [
      { label: 'Apple', value: 'apple', type: 'Fruits' },
      { label: 'Mango', value: 'mango', type: 'Fruits' },
      { label: 'Red', value: 'red', type: 'Colours' },
      { label: 'Black', value: 'black', type: 'Colours' },
    ],
    selectedValue: [],
    group: true,
    displaySelected: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Select an Item',
    placeholder: 'e.g., Apple, Red',
    list: [
      { label: 'Apple', value: 'apple', type: 'Fruits' },
      { label: 'Mango', value: 'mango', type: 'Fruits' },
      { label: 'Red', value: 'red', type: 'Colours', disabled: true },
      { label: 'Black', value: 'black', type: 'Colours', disabled: true },
    ],
    selectedValue: [],
    group: true,
    displaySelected: true,
  },
};

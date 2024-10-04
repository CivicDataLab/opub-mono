import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { TListItem } from '../../types/combobox';
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
    selectedValue: 'Banana',
    onChange: (e: any) => {
      console.log(e);
    },
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

export const CreatableSelect: Story = {
  args: {
    label: 'Your favorite food',
    placeholder: 'e.g., Apple, Burger',
    list: options,
    displaySelected: true,
    selectedValue: [],
    creatable: true,
    onChange: (e: any) => {
      console.log(e);
    },
  },
};

export const Tags: Story = {
  args: {
    label: 'Your favorite food',
    placeholder: 'e.g., Apple, Burger',
    list: options,
    displaySelected: true,
    onChange: (e: any) => {
      console.log(e);
    },
    selectedValue: [
      {
        value: 'Apple',
        label: 'Apple',
      },
    ],
  },
};

export const Grouping: Story = {
  args: {
    label: 'Select an Item',
    placeholder: 'e.g., Apple, Red',
    list: [
      { label: 'Apple', value: 'apple', type: 'Fruits' },
      { label: 'Mango', value: 'mango', type: 'Fruits' },
      { label: 'Red', value: 'red', type: 'Colors' },
      { label: 'Black', value: 'black', type: 'Colors' },
    ],
    selectedValue: [],
    group: true,
    displaySelected: true,
  },
};

export const GroupingMissingType: Story = {
  args: {
    label: 'Select an Item',
    placeholder: 'e.g., Apple, Red',
    list: [
      { label: 'Mango', value: 'mango' },
      { label: 'France', value: 'france' },
      { label: 'Red', value: 'red', type: 'Colors' },
      { label: 'Black', value: 'black', type: 'Colors' },
      { label: 'Apple', value: 'apple', type: 'Fruits' },
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
      { label: 'Red', value: 'red', type: 'Colors', disabled: true },
      { label: 'Black', value: 'black', type: 'Colors', disabled: true },
    ],
    selectedValue: [],
    group: true,
    displaySelected: true,
  },
};

export const DisableOnSelect: Story = {
  render: (args) => {
    const { list, ...rest } = args;
    const [items, setItems] = React.useState(list);

    return (
      <Combobox
        {...rest}
        onChange={(e) => {
          const finalArr = items.map((item) => {
            if (Array.isArray(e) && e.length > 0) {
              if (item.type !== e[0].type) {
                return { ...item, disabled: true };
              }
            } else {
              return { ...item, disabled: false };
            }

            return item;
          });

          setItems(finalArr);
        }}
        list={items}
      />
    );
  },
  args: {
    label: 'Select an Item',
    placeholder: 'e.g., Apple, Red',
    list: [
      { label: 'Apple', value: 'apple', type: 'Fruits' },
      { label: 'Mango', value: 'mango', type: 'Fruits' },
      { label: 'Red', value: 'red', type: 'Colors' },
      { label: 'Black', value: 'black', type: 'Colors' },
    ],
    selectedValue: [],
    group: true,
    displaySelected: true,
  },
};

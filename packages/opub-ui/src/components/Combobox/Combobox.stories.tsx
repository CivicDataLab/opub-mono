import { Meta, StoryObj } from '@storybook/react';
import { Combobox, ComboboxMulti } from './Combobox';

/**
 * Combobox is an accessible autocomplete input that enables users to filter a list of options and select one or more values.
 *
 * Reference: https://ariakit.org/examples/combobox-multiple
 */
const meta = {
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  'Apple',
  'Banana',
  'Broccoli',
  'Burger',
  'Cake',
  'Candy',
  'Carrot',
  'Cherry',
  'Chocolate',
  'Cookie',
  'Cucumber',
  'Donut',
  'Fish',
  'Fries',
  'Grape',
  'Green apple',
  'Hot dog',
  'Ice cream',
  'Kiwi',
  'Lemon',
  'Lollipop',
  'Onion',
  'Orange',
  'Pasta',
  'Pineapple',
  'Pizza',
  'Potato',
  'Salad',
  'Sandwich',
  'Steak',
  'Strawberry',
  'Tomato',
  'Watermelon',
];

export const Default: Story = {
  args: {
    label: 'Your favorite food',
    placeholder: 'e.g., Apple, Burger',
    defaultList: options,
    defaultValue: 'Banana',
  },
};

export const Multi: Story = {
  render: ({ ...args }) => {
    return (
      <ComboboxMulti defaultList={options} defaultValues="Banana" {...args} />
    );
  },

  args: {
    label: 'Your favorite food',
    placeholder: 'e.g., Apple, Burger',
    defaultList: options,
  },
};

export const VerticalContent: Story = {
  render: ({ ...args }) => {
    return (
      <ComboboxMulti defaultList={options} defaultValues="Banana" {...args} />
    );
  },

  args: {
    label: 'Your favorite food',
    placeholder: 'e.g., Apple, Burger',
    defaultList: options,
    verticalContent: true,
  },
};

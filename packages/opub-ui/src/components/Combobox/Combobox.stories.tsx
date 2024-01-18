import { Combobox } from "./Combobox";
import { Meta, StoryObj } from "@storybook/react";

/**
 * Combobox is an accessible autocomplete input that enables users to filter a list of options and select one or more values.
 *
 * Reference: https://ariakit.org/examples/combobox-multiple
 */
const meta = {
  title: "Components/Combobox",
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: string[] = [
  "Apple",
  "Banana",
  "Broccoli",
  "Burger",
  "Cake",
  "Candy",
  "Carrot",
  "Cherry",
  "Chocolate",
  "Cookie",
  "Cucumber",
  "Donut",
  "Fish",
  "Fries",
  "Grape",
  "Green apple",
  "Hot dog",
  "Ice cream",
  "Kiwi",
  "Lemon",
  "Lollipop",
  "Onion",
  "Orange",
  "Pasta",
  "Pineapple",
  "Pizza",
  "Potato",
  "Salad",
  "Sandwich",
  "Steak",
  "Strawberry",
  "Tomato",
  "Watermelon",
];

export const Default: Story = {
  args: {
    label: "Your favorite food",
    placeholder: "e.g., Apple, Burger",
    list: options,
  },
};

export const MultiSelect: Story = {
  args: {
    label: "Your favorite food",
    placeholder: "e.g., Apple, Burger",
    list: options,
    selectedValue: [],
  },
};

export const DisplaySelected: Story = {
  args: {
    label: "Your favorite food",
    placeholder: "e.g., Apple, Burger",
    list: options,
    displaySelected: true,
    selectedValue: ["Apple"],
  },
};

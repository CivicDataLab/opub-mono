import { AddCircle } from '@opub-icons/workflow';
import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../Flex';
import { Listbox } from './Listbox';

/**
 * A Listbox is a vertical list of interactive options, with room for icons, descriptions, and other elements.
 *
 * Reference: https://polaris.shopify.com/components/lists/listbox
 */
const meta = {
  component: Listbox,
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export function Default({ ...args }) {
  return (
    <Listbox accessibilityLabel="Basic Listbox example" {...args}>
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
    </Listbox>
  );
}

export function WithLoading({ ...args }) {
  return (
    <Listbox accessibilityLabel="Listbox with loading example" {...args}>
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
      <Listbox.Loading accessibilityLabel="loading example" />
    </Listbox>
  );
}

export function WithAction({ ...args }) {
  return (
    <Listbox accessibilityLabel="Listbox with Action example" {...args}>
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2" divider>
        Item 2
      </Listbox.Option>
      <Listbox.Action value="ActionValue">
        <Flex gap={4}>
          <AddCircle size={14} />
          <div>Add item</div>
        </Flex>
      </Listbox.Action>
    </Listbox>
  );
}

export function WithCustomElement({ ...args }) {
  return (
    <Listbox accessibilityLabel="Listbox with custom element example" {...args}>
      <Listbox.Action value="ActionValue" divider>
        Add item
      </Listbox.Action>
      <Listbox.Option value="UniqueValue-1">
        <div>Item 1</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-2">
        <div>Item 2</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-3">
        <div>Item 3</div>
      </Listbox.Option>
      <Listbox.Loading accessibilityLabel="items are loading" />
    </Listbox>
  );
}

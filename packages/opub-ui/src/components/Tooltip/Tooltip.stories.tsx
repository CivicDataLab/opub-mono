import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Text } from '../Text';
import { Tooltip } from './Tooltip';

/**
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/tooltip
 */
const meta = {
  component: Tooltip,
  argTypes: {
    children: {
      control: 'null',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Text fontWeight="bold" as="span">
        Trigger
      </Text>
    ),
    content: 'Tooltip content',
  },
};

export const Underline: Story = {
  args: {
    children: (
      <Text fontWeight="bold" as="span">
        Trigger underline
      </Text>
    ),
    content: 'Tooltip content',
    hasUnderline: true,
  },
};

export const WithButton: Story = {
  args: {
    children: <Button size="slim">Trigger</Button>,
    content: 'Tooltip content',
  },
};

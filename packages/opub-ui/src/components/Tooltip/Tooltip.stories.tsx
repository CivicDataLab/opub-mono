import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { Tooltip } from './Tooltip';
import { Meta, StoryObj } from '@storybook/react';

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
  render: ({ ...args }) => <Tooltip {...args} />,
  args: {
    children: (
      <Text fontWeight="bold" as="span">
        Trigger
      </Text>
    ),
    content: 'Tooltip content',
  },
};

export const Multiple: Story = {
  render: ({ ...args }) => (
    <Box flex gap="1">
      <Tooltip {...args} />
      <Tooltip {...args} />
    </Box>
  ),
  args: {
    children: <Button size="slim">Trigger</Button>,
    content: 'Tooltip content',
  },
};

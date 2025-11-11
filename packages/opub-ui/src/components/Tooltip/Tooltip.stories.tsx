import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Text } from '../Text';
import { Tooltip } from './Tooltip';

/**
 * A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/tooltip
 */
const meta = {
  title: 'Components/Tooltip',
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

export const Controlled: Story = {
  render: ({ ...args }) => <Tooltip {...args} />,
  args: {
    children: (
      <Text fontWeight="bold" as="span">
        Trigger
      </Text>
    ),
    content:
      'Lorem Ipsum is simply Lorem Ipsum is simply dummy typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever of Lorem Ipsum dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever of Lorem Ipsum',
    open: true,
    width: 'wide',
  },
};

export const Multiple: Story = {
  render: ({ ...args }) => (
    <div className="flex gap-1">
      <Tooltip {...args} content="Trigger 1" />
      <Tooltip {...args} content="Trigger 2" />
    </div>
  ),
  args: {
    children: <Button size="slim">Trigger</Button>,
    content: 'Tooltip content',
  },
};

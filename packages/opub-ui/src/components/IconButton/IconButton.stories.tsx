import { Box } from '../Box';
import { Tooltip } from '../Tooltip';
import { IconButton } from './IconButton';
import { Meta, StoryObj } from '@storybook/react';
import { IconMinus, IconPlus, IconSettings } from '@tabler/icons-react';

/**
 * Icon Button component
 */
const meta = {
  title: 'Verified/IconButton',
  component: IconButton,

  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    icon: {
      control: {
        type: 'select',
        options: [IconPlus, IconMinus, IconSettings],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['slim', 'medium', 'large'],
      },
    },
    withTooltip: {
      control: {
        type: 'boolean',
      },
    },
    tooltipText: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'IconButton',
    icon: IconPlus,
  },
};

export const WithTooltip: Story = {
  render: (args) => (
    <Tooltip.Provider>
      <IconButton {...args} />
    </Tooltip.Provider>
  ),

  args: {
    children: 'Tooltip content',
    icon: IconPlus,
    withTooltip: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Box flex alignItems="center" gap="4">
      <IconButton {...args} size="slim" />
      <IconButton {...args} size="medium" />
      <IconButton {...args} size="large" />
    </Box>
  ),

  args: {
    children: 'IconButton',
    icon: IconPlus,
    onClick: () => alert('Clicked'),
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Tooltip.Provider>
      <IconButton {...args} />
    </Tooltip.Provider>
  ),
  args: {
    children: 'IconButton',
    icon: IconPlus,
    disabled: true,
    tooltipText: 'Disabled',
  },
};

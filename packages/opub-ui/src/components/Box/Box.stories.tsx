import { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text';
import { Box } from './Box';

/**
 * Box is the most primitive layout component. It’s a way to access design tokens
 *
 * Reference: https://polaris.shopify.com/components/layout-and-structure/box
 */
const meta = {
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    background: 'background-pressed',
    children: (
      <Text as="h2" variant="bodyMd" fontWeight="medium">
        Content inside a box
      </Text>
    ),
  },
};

export const BorderWidth: Story = {
  args: {
    ...Default.args,
    border: 'dark',
  },
};

export const BorderRadius: Story = {
  args: {
    ...Default.args,
    borderRadius: '3',
  },
};

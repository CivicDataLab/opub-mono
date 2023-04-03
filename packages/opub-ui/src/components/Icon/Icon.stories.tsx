import { AddCodeMajor } from '@shopify/polaris-icons';
import { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

/**
 * Icons are used to visually communicate core parts of the product and available actions.
 *
 * Reference: https://polaris.shopify.com/components/images-and-icons/icon
 */
const meta = {
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source: AddCodeMajor,
    color: 'base',
  },
};

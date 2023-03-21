import { GraphSunburst } from '@opub-icons/workflow';
import { Meta, StoryObj } from '@storybook/react';
import { Thumbnail } from './Thumbnail';

/**
 * Thumbnail Description
 *
 * Reference: #
 */
const meta = {
  component: Thumbnail,
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source:
      'https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg',
    alt: 'Black choker necklace',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const ExtraSmall: Story = {
  args: {
    ...Default.args,
    size: 'extraSmall',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const SVG: Story = {
  args: {
    ...Default.args,
    size: 'small',
    source: GraphSunburst,
  },
};

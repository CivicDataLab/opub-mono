import { Meta, StoryObj } from '@storybook/react';
import { SkeletonThumbnail } from './SkeletonThumbnail';

/**
 * Skeleton thumbnail is used to provide a low fidelity representation of an image before it appears on the page
 *
 * Reference: https://polaris.shopify.com/components/feedback-indicators/skeleton-thumbnail
 */
const meta = {
  component: SkeletonThumbnail,
} satisfies Meta<typeof SkeletonThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

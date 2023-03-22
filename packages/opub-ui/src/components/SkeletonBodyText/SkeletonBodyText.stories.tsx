import { Meta, StoryObj } from '@storybook/react';
import { SkeletonBodyText } from './SkeletonBodyText';

/**
 * Skeleton body text is used to provide a low fidelity representation of content before it appears on the page
 *
 * Reference: https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text
 */
const meta = {
  component: SkeletonBodyText,
} satisfies Meta<typeof SkeletonBodyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

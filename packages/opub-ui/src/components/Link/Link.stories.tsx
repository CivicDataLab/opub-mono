import { Meta } from '@storybook/react';
import { Link } from './Link';

/**
 * Links take users to another place, and usually appear within or directly following a sentence.
 *
 * Reference: https://polaris.shopify.com/components/navigation/link
 */
export default {
  component: Link,
} as Meta<typeof Link>;

export const Primary = {
  args: {
    children: 'Link',
    url: '#',
  },
};

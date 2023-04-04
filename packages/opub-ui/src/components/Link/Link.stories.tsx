import { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

/**
 * Links take users to another place, and usually appear within or directly following a sentence.
 *
 * Reference: https://polaris.shopify.com/components/navigation/link
 */
const meta = {
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Link to google',
    url: 'https://google.com',
    external: true,
  },
};

export const Multiple: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Link url="https://google.com" {...args}>
          Link 1
        </Link>{' '}
        <Link url="https://yahoo.com" {...args}>
          Link 2
        </Link>
      </>
    );
  },
  args: {
    external: true,
  },
};

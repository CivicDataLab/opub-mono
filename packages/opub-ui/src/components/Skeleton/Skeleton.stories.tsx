import { Skeleton } from './Skeleton';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Skeleton primitive to show a placeholder while content is loading
 */
const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <div>
        <Skeleton {...args} />
      </div>
    );
  },
  args: {
    style: { height: '32px', width: '100%' },
    className: 'supports-tailwind-classes',
  },
};

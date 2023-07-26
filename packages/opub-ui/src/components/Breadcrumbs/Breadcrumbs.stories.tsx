import { Breadcrumbs } from './Breadcrumbs';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Breadcrumbs are a navigation system used to show a user's location in a site or app.
 *
 * Reference: https://atlassian.design/components/breadcrumbs/examples
 */

const meta = {
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    crumbs: [
      {
        label: 'Item 1',
        href: '#',
      },
      {
        label: 'Item 2',
        href: '#',
      },
      {
        label: 'Item 3',
        href: '#',
      },
      {
        label: 'Item 4',
        href: '#',
      },
      {
        label: 'Item 5',

        href: '#',
      },
    ],
  },
};

export const BeforeafterCollapse: Story = {
  args: {
    crumbs: [
      {
        label: 'Item 1',
        href: '#',
      },
      {
        label: 'Item 2',
        href: '#',
      },
      {
        label: 'Item 3',
        href: '#',
      },
      {
        label: 'Item 4',
        href: '#',
      },
      {
        label: 'Item 5',

        href: '#',
      },
    ],

    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
  },
};

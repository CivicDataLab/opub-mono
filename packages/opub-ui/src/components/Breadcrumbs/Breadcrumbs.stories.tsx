import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

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
    crumbs: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    selected: (crumb: any) => {
      console.log(crumb);
    },
  },
};

export const MaxItems: Story = {
  args: {
    crumbs: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    selected: (crumb: any) => {
      console.log(crumb);
    },
    maxItems: 3,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
  },
};

import { Meta, StoryObj } from '@storybook/react-vite';
import { IconCheck, IconFileExport, IconFileImport } from '@tabler/icons-react';

import { Icon } from '../Icon';
import { ActionList } from './ActionList';

/**
 * Action lists render a list of actions or selectable options. This component is usually placed inside a popover container to create a dropdown menu
 *
 * Reference: https://polaris.shopify.com/components/lists/action-list
 */
const meta = {
  title: 'Components/ActionList',
  component: ActionList,
} satisfies Meta<typeof ActionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <div className="">
        <ActionList {...args} />
      </div>
    );
  },
  args: {
    actionRole: 'menuitem',
    items: [{ content: 'Create Organisation' }, { content: 'Create Dataset' }],
  },
};

export const WithSuffix: Story = {
  ...Default,
  args: {
    items: [
      {
        active: true,
        content: 'Import file',
        icon: IconFileImport,
        suffix: IconCheck,
      },
      { content: 'Export file', icon: IconFileExport },
    ],
  },
};

export const WithSections: Story = {
  ...Default,
  args: {
    sections: [
      {
        title: 'File options',
        items: [{ content: 'Import file' }, { content: 'Export file' }],
      },
      {
        title: 'Bulk actions',
        items: [{ content: 'Edit' }, { content: 'Delete' }],
      },
    ],
  },
};

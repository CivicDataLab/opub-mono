import { Button } from '../Button';
import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { ActionList } from './ActionList';
import {
  DeleteMinor,
  EditMinor,
  ExportMinor,
  ImportMinor,
  TickMinor,
} from '@shopify/polaris-icons';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Action lists render a list of actions or selectable options. This component is usually placed inside a popover container to create a dropdown menu
 *
 * Reference: https://polaris.shopify.com/components/lists/action-list
 */
const meta = {
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
        icon: <ImportMinor />,
        suffix: <Icon source={TickMinor} />,
      },
      { content: 'Export file', icon: <ExportMinor /> },
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

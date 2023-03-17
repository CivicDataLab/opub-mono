import { Checkmark, Delete, Edit, Export, Import } from '@opub-icons/workflow';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Content, Popover, Trigger } from '../Popover';
import { ActionList } from './ActionList';

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
      <Popover>
        <Trigger>
          <Button disclosure>More actions</Button>
        </Trigger>
        <Content>
          <ActionList {...args} />
        </Content>
      </Popover>
    );
  },
  args: {
    actionRole: 'menuitem',
    items: [
      {
        content: 'Import file',
        onAction: () => console.log('Imported action'),
      },
      {
        content: 'Export file',
        onAction: () => console.log('Exported action'),
      },
    ],
  },
};

export const WithSuffix: Story = {
  ...Default,
  args: {
    actionRole: 'menuitem',
    items: [
      {
        active: true,
        content: 'Import file',
        icon: <Import />,
        suffix: <Checkmark />,
      },
      { content: 'Export file', icon: <Export /> },
    ],
  },
};

export const WithSections: Story = {
  ...Default,
  args: {
    actionRole: 'menuitem',
    sections: [
      {
        title: 'File options',
        items: [
          { content: 'Import file', icon: <Import /> },
          { content: 'Export file', icon: <Export /> },
        ],
      },
      {
        title: 'Bulk actions',
        items: [
          { content: 'Edit', icon: <Edit /> },
          { content: 'Delete', icon: <Delete /> },
        ],
      },
    ],
  },
};

export const DestructiveItem: Story = {
  ...Default,
  args: {
    actionRole: 'menuitem',
    items: [
      {
        active: true,
        content: 'Import file',
        icon: <Import />,
      },
      { content: 'Export file', icon: <Export /> },
      {
        destructive: true,
        content: 'Delete file',
        icon: <Delete />,
      },
    ],
  },
};

export const HelpText: Story = {
  ...Default,
  args: {
    actionRole: 'menuitem',
    sections: [
      {
        items: [
          {
            content: 'Blog posts',
            helpText: 'Manage your blog articles',
          },
          {
            content: 'Blogs',
            helpText: 'Manage blogs published to your Online Store',
          },
        ],
      },
    ],
  },
};

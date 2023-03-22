import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Menu } from './Menu';
import { Checkmark, Delete, Edit, Export, Import } from '@opub-icons/workflow';

/**
 * A wrapper around Popover and ActionList Components
 */
const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button disclosure>More actions</Button>,
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
    trigger: <Button disclosure>More actions</Button>,
    items: [
      {
        active: true,
        content: 'Import file',
        icon: <Import />,
        suffix: <Checkmark size={14} />,
      },
      { content: 'Export file', icon: <Export /> },
    ],
  },
};

export const WithSections: Story = {
  ...Default,
  args: {
    trigger: <Button disclosure>More actions</Button>,
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
    trigger: <Button disclosure>More actions</Button>,
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
    trigger: <Button disclosure>More actions</Button>,
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

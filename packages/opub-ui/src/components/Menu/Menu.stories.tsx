import { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCheck,
  IconEdit,
  IconFileExport,
  IconFileImport,
  IconTrash,
} from '@tabler/icons-react';

import { Button } from '../Button';
import { Menu } from './Menu';

/**
 * A wrapper around Popover and ActionList Components
 */
const meta = {
  title: 'Components/Menu',
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
    trigger: <Button disclosure>More actions</Button>,
    sections: [
      {
        title: 'File options',
        items: [
          { content: 'Import file', icon: IconFileImport },
          { content: 'Export file', icon: IconFileExport },
        ],
      },
      {
        title: 'Bulk actions',
        items: [
          { content: 'Edit', icon: IconEdit },
          { content: 'Delete', destructive: true, icon: IconTrash },
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
        icon: IconFileImport,
      },
      { content: 'Export file', icon: IconFileExport },
      {
        destructive: true,
        content: 'Delete file',
        icon: IconTrash,
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

import { Meta } from '@storybook/react';
import { Tag } from './Tag';

export default {
  component: Tag,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof Tag>;

export const Primary = {
  args: {
    children: 'Tag',
  },
};

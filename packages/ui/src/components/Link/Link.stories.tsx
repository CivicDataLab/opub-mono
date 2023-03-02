import { Meta } from '@storybook/react';
import { Link } from './Link';

export default {
  component: Link,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof Link>;

export const Primary = {
  args: {
    children: 'Link',
  },
};

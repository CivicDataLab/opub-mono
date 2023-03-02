import { Meta } from '@storybook/react';
import { Link } from './Link';

export default {
  component: Link,
} as Meta<typeof Link>;

export const Primary = {
  args: {
    children: 'Link',
    url: '#',
  },
};

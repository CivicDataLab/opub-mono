import { Meta } from '@storybook/react';
import { Spinner } from './Spinner';

export default {
  component: Spinner,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof Spinner>;

export const Primary = {
  args: {
    label: 'Spinner',
  },
};
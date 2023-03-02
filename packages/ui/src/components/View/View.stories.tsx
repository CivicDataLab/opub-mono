import { Meta } from '@storybook/react';
import { View } from './View';

export default {
  component: View,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof View>;

export const Primary = {
  args: {
    children: 'View',
  },
};

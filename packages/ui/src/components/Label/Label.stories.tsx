import { Meta } from '@storybook/react';
import { Label } from './Label';

export default {
  component: Label,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof Label>;

export const Primary = {
  args: {
    children: 'Label',
  },
};

import { Meta } from '@storybook/react';
import { Checkbox } from './Checkbox';

export default {
  component: Checkbox,

  argTypes: {
    children: {
      control: 'text',
      description: 'Content of the label',
    },
  },
} as Meta<typeof Checkbox>;

export const Primary = {
  args: {
    children: 'Checkbox',
  },
};

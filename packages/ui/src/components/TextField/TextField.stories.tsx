import { Meta } from '@storybook/react';
import { TextField } from './TextField';

export default {
  component: TextField,

  argTypes: {
    validationState: {
      options: ['valid', 'invalid'],
      control: { type: 'select' },
      description: 'whether the state is `valid` or `invalid`',
    },
  },
} as Meta<typeof TextField>;

export const Primary = {
  args: {
    label: 'Label Text',
  },
};

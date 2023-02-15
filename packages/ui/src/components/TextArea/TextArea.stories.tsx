import { Meta } from '@storybook/react';
import { TextArea } from './TextArea';

export default {
  component: TextArea,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof TextArea>;

export const Primary = {
  args: {
    label: 'TextArea',
  },
};
import { Meta } from '@storybook/react';
import { Label } from './Label';

/**
 * Renders an accessible label associated with controls.
 */
export default {
  component: Label,

  argTypes: {
    children: {
      control: 'text',
      description: 'Content of the Label',
    },
    htmlFor: {
      control: 'text',
      description: 'id to connect to the form field',
    },
  },
} as Meta<typeof Label>;

export const Primary = {
  args: {
    children: 'Label',
    htmlFor: '#',
  },
};

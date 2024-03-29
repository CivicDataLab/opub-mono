import { Meta } from '@storybook/react';

import { Label } from './Label';

/**
 * Renders an accessible label associated with controls.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/label
 */
export default {
  title: 'Components/Label',
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

export const Error = {
  args: {
    children: 'Label Error',
    htmlFor: '#',
    error: true,
  },
};

import { ArrowRight } from '@opub-icons/workflow';
import { Meta } from '@storybook/react';

import { Button } from './Button';

export default {
  component: Button,

  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'disabled'],
      control: { type: 'select' },
      description: 'Type of button',
    },
    size: {
      options: ['large', 'small'],
      control: { type: 'select' },
      description: 'Size of the button',
    },
    children: {
      control: 'text',
      description: 'Hidden text content for the button',
    },
  },
} as Meta<typeof Button>;

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled',
    variant: 'disabled',
  },
};

export const Link = {
  args: {
    href: '/#',
    children: 'Link',
  },
};

export const IconBefore = {
  args: {
    children: 'Button',
    iconBefore: <ArrowRight width={14} />,
  },
};

export const IconAfter = {
  args: {
    children: 'Button',
    iconAfter: <ArrowRight />,
    size: 'large',
  },
};

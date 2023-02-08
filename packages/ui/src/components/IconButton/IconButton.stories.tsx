import { ArrowRight } from '@opub-icons/workflow';
import { Meta, StoryFn } from '@storybook/react';
import { IconButton } from './IconButton';

export default {
  component: IconButton,

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
    icon: {
      name: 'icon',
      description: 'SVG Icon for the button',
      control: { type: 'none' },
    },
  },
} as Meta<typeof IconButton>;

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button',
    icon: <ArrowRight />,
  },
};

export const Link = {
  args: {
    href: '/#',
    children: 'Link',
    icon: <ArrowRight />,
  },
};

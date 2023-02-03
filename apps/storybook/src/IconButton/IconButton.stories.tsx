import { ArrowRight } from '@opub-icons/workflow';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton } from 'ui';

export default {
  title: 'Components/IconRight',
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
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (props) => (
  <IconButton {...props} />
);
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Button',
  icon: <ArrowRight />,
};

export const Link = Template.bind({});
Link.args = {
  href: '/#',
  children: 'Link',
  icon: <ArrowRight />,
};

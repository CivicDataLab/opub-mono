import { ArrowRight } from '@opub-icons/workflow';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from 'ui';

export default {
  title: 'Components/Button',
  component: Button,

  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'disabled'],
      control: { type: 'radio' },
    },
    size: {
      options: ['large', 'small'],
      control: { type: 'radio' },
    },
    children: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (props) => (
  <Button {...props} />
);
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variant: 'secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  variant: 'disabled',
};

export const Link = Template.bind({});
Link.args = {
  href: '#',
  children: 'Link',
};

export const IconBefore = Template.bind({});
IconBefore.args = {
  children: 'Button',
  iconBefore: <ArrowRight width={14} />,
};

export const IconAfter = Template.bind({});
IconAfter.args = {
  children: 'Button',
  iconAfter: <ArrowRight />,
  size: 'large',
};

import { ArrowRight } from '@opub-icons/workflow';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton } from 'ui';

export default {
  title: 'Components/IconRight',
  component: IconButton,

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

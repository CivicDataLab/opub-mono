import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InputBase } from './InputBase';

export default {
  title: 'Components/InputBase',
  component: InputBase,

  argTypes: {
    validationState: {
      options: ['valid', 'invalid'],
      control: { type: 'select' },
      description: 'whether the state is `valid` or `invalid`',
    },
  },
} as ComponentMeta<typeof InputBase>;

const Template: ComponentStory<typeof InputBase> = (props) => (
  <InputBase {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};

export const Label = Template.bind({});
Label.args = {
  label: 'Label Text',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Label Text',
  isRequired: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};

export const Error = Template.bind({});
Error.args = {
  validationState: 'invalid',
};

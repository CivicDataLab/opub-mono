import { Meta, StoryFn } from '@storybook/react';
import { InputBase } from './InputBase';

export default {
  component: InputBase,

  argTypes: {
    validationState: {
      options: ['valid', 'invalid'],
      control: { type: 'select' },
      description: 'whether the state is `valid` or `invalid`',
    },
  },
} as Meta<typeof InputBase>;

export const Primary = {
  args: {
    label: 'Label Text',
  },
};

export const Required = {
  args: {
    label: 'Label Text',
    isRequired: true,
  },
};

export const Variations = () => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <InputBase isDisabled />
      <InputBase validationState="invalid" />
    </div>
  );
};

export const Disabled = {
  args: {
    isDisabled: true,
  },
};

export const Error = {
  args: {
    validationState: 'invalid',
  },
};

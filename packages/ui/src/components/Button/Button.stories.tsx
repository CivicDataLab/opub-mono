import { ArrowRight } from '@opub-icons/workflow';
import { Meta } from '@storybook/react';

import { Button } from './Button';
import { PropsVariationSection } from '@utils/helpers';

export default {
  component: Button,

  argTypes: {
    variant: {
      options: ['primary', 'destructive', 'outline', 'plain'],
      control: { type: 'select' },
      description: 'Type of button',
    },
    size: {
      options: ['slim', 'medium', 'large'],
      control: { type: 'select' },
      description: 'Changes the size of the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Allows the button to grow to the width of its container',
    },
    children: {
      control: 'text',
      description: 'Content of the Button',
    },
  },
} as Meta<typeof Button>;

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const States = () => (
  <PropsVariationSection
    component={Button}
    common={{ onChange: () => {}, children: 'Button' }}
    xAxis={{
      default: {},
      primary: { variant: 'primary' },
      destructive: { variant: 'destructive' },
      outline: { variant: 'outline' },
      plain: { variant: 'plain' },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
      slim: { size: 'slim' },
      'large + full width': { size: 'large', fullWidth: true },
      'medium + full width': { fullWidth: true },
      'slim + full width': { size: 'slim', fullWidth: true },
      loading: { loading: true },
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
  />
);

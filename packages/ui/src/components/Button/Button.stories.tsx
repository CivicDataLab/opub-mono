import { SortOrderDown } from '@opub-icons/workflow';
import { Meta } from '@storybook/react';

import { PropsVariationSection } from '@utils/helpers';
import { Button } from './Button';

/**
 * Primary UI component for user interface
 */
export default {
  component: Button,
  tags: ['autodocs'],
} as Meta<typeof Button>;

export const Default = {
  args: {
    children: 'Button',
  },
  parameters: { pseudo: { focus: true } },
};

export const Basic = () => (
  <PropsVariationSection
    component={Button}
    common={{ onChange: () => {}, children: 'Button' }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
      slim: { size: 'slim' },

      'large + full width': { size: 'large', fullWidth: true },
      'medium + full width': { fullWidth: true },
      'slim + full width': { size: 'slim', fullWidth: true },

      'large + with disclosure': { size: 'large', disclosure: 'select' },
      'medium + with disclosure': { disclosure: 'select' },
      'slim + with disclosure': { size: 'slim', disclosure: 'select' },

      'large + with icon': { size: 'large', icon: <SortOrderDown /> },
      'medium + with icon': { icon: <SortOrderDown /> },
      'slim + with icon': { size: 'slim', icon: <SortOrderDown /> },

      loading: { loading: true },
    }}
  />
);

export const Primary = () => (
  <PropsVariationSection
    component={Button}
    common={{ onChange: () => {}, children: 'Button', primary: true }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
      slim: { size: 'slim' },
      'large + full width': { size: 'large', fullWidth: true },
      'medium + full width': { fullWidth: true },
      'slim + full width': { size: 'slim', fullWidth: true },
      loading: { loading: true },
    }}
  />
);

export const Destructive = () => (
  <PropsVariationSection
    component={Button}
    common={{ onChange: () => {}, children: 'Button', destructive: true }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
      slim: { size: 'slim' },
      loading: { loading: true },
    }}
  />
);

export const Outline = () => (
  <PropsVariationSection
    component={Button}
    common={{ onChange: () => {}, children: 'Button', outline: true }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
      slim: { size: 'slim' },

      'large + with icon': { size: 'large', icon: <SortOrderDown /> },
      'medium + with icon': { icon: <SortOrderDown /> },
      'slim + with icon': { size: 'slim', icon: <SortOrderDown /> },
    }}
  />
);

export const OutlineMonochrome = () => (
  <PropsVariationSection
    component={Button}
    color="#bf0711"
    common={{
      onChange: () => {},
      children: 'Button',
      outline: true,
      monochrome: true,
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
      slim: { size: 'slim' },
    }}
  />
);

export const Plain = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      plain: true,
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
    }}
  />
);

export const PlainMonochrome = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      plain: true,
      monochrome: true,
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
    }}
  />
);

export const PlainDestructiveMonochrome = () => (
  <PropsVariationSection
    component={Button}
    color="#bf0711"
    common={{
      onChange: () => {},
      children: 'Button',
      plain: true,
      monochrome: true,
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
    }}
  />
);

export const PlainDisclosure = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      plain: true,
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      pressed: { pressed: true },
    }}
    yAxis={{
      'large + disclosure + true': { size: 'large', disclosure: 'down' },
      'medium + disclosure + true': { size: 'medium', disclosure: 'down' },

      'large + disclosure + false': { size: 'large', disclosure: 'up' },
      'medium + disclosure + false': { size: 'medium', disclosure: 'up' },
    }}
  />
);

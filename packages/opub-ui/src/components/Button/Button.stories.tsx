import { PropsVariationSection } from '../../utils/helpers';
import { Icon } from '../Icon';
import { Button } from './Button';
import { Meta, StoryObj } from '@storybook/react';
import { IconSelector } from '@tabler/icons-react';

/**
 * Primary UI component for user interface
 *
 * Reference: https://polaris.shopify.com/components/actions/button
 */
const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Disclosure: Story = {
  args: {
    children: 'Button',
    connectedDisclosure: {
      actions: [
        { content: 'Create Organisation' },
        { content: 'Create Dataset' },
      ],
    },
  },
};

export const PrimaryBasic = () => {
  <Button>Test</Button>;
  return (
    <PropsVariationSection
      component={Button}
      common={{ onChange: () => {}, children: 'Button', action: 'primary' }}
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

        'large + with icon': {
          size: 'large',
          icon: <Icon source={IconSelector} />,
        },
        'medium + with icon': { icon: <Icon source={IconSelector} /> },
        'slim + with icon': {
          size: 'slim',
          icon: <Icon source={IconSelector} />,
        },

        loading: { loading: true },
      }}
    />
  );
};

export const PrimaryInteractive = () => (
  <PropsVariationSection
    component={Button}
    common={{ onChange: () => {}, children: 'Button', variant: 'interactive' }}
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

export const PrimaryCritical = () => (
  <PropsVariationSection
    component={Button}
    common={{ onChange: () => {}, children: 'Button', variant: 'critical' }}
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
export const PrimarySuccess = () => (
  <PropsVariationSection
    component={Button}
    common={{ onChange: () => {}, children: 'Button', variant: 'success' }}
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

export const SecondaryBasic = () => (
  <PropsVariationSection
    component={Button}
    common={{ onChange: () => {}, children: 'Button', kind: 'secondary' }}
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

export const SecondaryInteractive = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      variant: 'interactive',
      kind: 'secondary',
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
      'large + full width': { size: 'large', fullWidth: true },
      'medium + full width': { fullWidth: true },
      'slim + full width': { size: 'slim', fullWidth: true },
      loading: { loading: true },
    }}
  />
);

export const SecondaryCritical = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      variant: 'critical',
      kind: 'secondary',
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
      'large + full width': { size: 'large', fullWidth: true },
      'medium + full width': { fullWidth: true },
      'slim + full width': { size: 'slim', fullWidth: true },
      loading: { loading: true },
    }}
  />
);
export const SecondarySuccess = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      variant: 'success',
      kind: 'secondary',
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
      'large + full width': { size: 'large', fullWidth: true },
      'medium + full width': { fullWidth: true },
      'slim + full width': { size: 'slim', fullWidth: true },
      loading: { loading: true },
    }}
  />
);

export const Plain = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      kind: 'tertiary',
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

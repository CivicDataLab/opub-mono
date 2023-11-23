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
  title: 'Verified/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {
//     children: 'Button',
//   },
// };

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
          icon: <Icon source={IconSelector} color="onBgDefault" />,
        },
        'medium + with icon': {
          icon: <Icon source={IconSelector} color="onBgDefault" />,
        },
        'slim + with icon': {
          size: 'slim',
          icon: <Icon source={IconSelector} color="onBgDefault" />,
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

export const TertiaryBasic = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      kind: 'tertiary',
      variant: 'basic',
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
    }}
  />
);

export const TertiaryInteractive = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      kind: 'tertiary',
      variant: 'interactive',
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
    }}
  />
);

export const TertiaryCritical = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      kind: 'tertiary',
      variant: 'critical',
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
    }}
    yAxis={{
      large: { size: 'large' },
      medium: {},
    }}
  />
);

export const TertiarySuccess = () => (
  <PropsVariationSection
    component={Button}
    common={{
      onChange: () => {},
      children: 'Button',
      kind: 'tertiary',
      variant: 'success',
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
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
      kind: 'tertiary',
    }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
    }}
    yAxis={{
      'large + disclosure + true': { size: 'large', disclosure: 'down' },
      'medium + disclosure + true': { size: 'medium', disclosure: 'down' },

      'large + disclosure + false': { size: 'large', disclosure: 'up' },
      'medium + disclosure + false': { size: 'medium', disclosure: 'up' },
    }}
  />
);

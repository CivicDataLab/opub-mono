import { SortMinor } from '@shopify/polaris-icons';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PropsVariationSection } from '../../utils/helpers';
import { Button } from './Button';

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

export const Basic = () => {
  <Button>Test</Button>;
  return (
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

        'large + with icon': { size: 'large', icon: <SortMinor /> },
        'medium + with icon': { icon: <SortMinor /> },
        'slim + with icon': { size: 'slim', icon: <SortMinor /> },

        loading: { loading: true },
      }}
    />
  );
};

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

      'large + with icon': { size: 'large', icon: <SortMinor /> },
      'medium + with icon': { icon: <SortMinor /> },
      'slim + with icon': { size: 'slim', icon: <SortMinor /> },
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

// export const PseudoStates = () => (
//   <Flex gap={12} className="story-grid pseudo">
//     <div style={{ outline: 'none' }}>
//       <Button>Normal</Button>
//     </div>
//     <div style={{ outline: 'none' }} className="pseudo-hover">
//       <Button>Hover</Button>
//     </div>
//     <div style={{ outline: 'none' }} className="pseudo-focus-visible">
//       <Button>Focus</Button>
//     </div>
//     <div
//       style={{ outline: 'none' }}
//       className="pseudo-hover pseudo-focus-visible"
//     >
//       <Button>Hover Focus</Button>
//     </div>
//   </Flex>
// );

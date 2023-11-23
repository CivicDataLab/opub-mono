import { PropsVariationSection } from '../../utils';
import { Icon } from './Icon';
import { AddCodeMajor } from '@shopify/polaris-icons';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Icons are used to visually communicate core parts of the product and available actions.
 *
 * Reference: https://polaris.shopify.com/components/images-and-icons/icon
 */
const meta = {
  title: 'Verified/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source: AddCodeMajor,
    color: 'default',
  },
};

export const Colors = () => (
  <PropsVariationSection
    component={Icon}
    common={{ source: AddCodeMajor }}
    xAxis={{
      default: {},
    }}
    yAxis={{
      default: {},
      subdued: { color: 'subdued' },
      critical: { color: 'critical' },
      warning: { color: 'warning' },
      success: { color: 'success' },
      highlight: { color: 'highlight' },
      interactive: { color: 'interactive' },
    }}
  />
);

export const BgColors = () => (
  <div
    style={{ backgroundColor: 'var(--background-solid-dark)', color: 'white' }}
  >
    <PropsVariationSection
      component={Icon}
      common={{ source: AddCodeMajor }}
      xAxis={{
        default: {},
      }}
      yAxis={{
        onBgDefault: { color: 'onBgDefault' },
        onBgSubdued: { color: 'onBgSubdued' },
        onBgDisabled: { color: 'onBgDisabled' },
      }}
    />
  </div>
);

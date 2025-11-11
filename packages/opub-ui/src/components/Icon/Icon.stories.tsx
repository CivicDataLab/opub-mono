import { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCode,
  IconSquareRoundedChevronLeftFilled,
} from '@tabler/icons-react';

import { PropsVariationSection } from '../../utils/storybook';
import { Icon } from './Icon';

/**
 * Icons are used to visually communicate core parts of the product and available actions.
 *
 * Reference: https://polaris.shopify.com/components/images-and-icons/icon
 */
const meta = {
  title: 'Components/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source: IconCode,
    color: 'default',
    backdrop: true,
  },
};

export const Colors = () => (
  <PropsVariationSection
    component={Icon}
    common={{ source: IconCode }}
    xAxis={{
      default: {},
      backdrop: {
        backdrop: true,
      },
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
      common={{ source: IconCode }}
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

export const Filled = () => (
  <div>
    <PropsVariationSection
      component={Icon}
      common={{ source: IconSquareRoundedChevronLeftFilled }}
      xAxis={{
        default: {},
      }}
      yAxis={{
        default: { color: 'default' },
      }}
    />
  </div>
);

import { Meta, StoryObj } from '@storybook/react';

import { PropsVariationSection } from '../../utils/storybook';
import { Pill } from './Pill';

/**
 * Pill is a component that displays a short string of text, which can removed.
 */
const meta = {
  title: 'Components/Pill',
  component: Pill,
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Pill',
  },
};

export const Long: Story = {
  ...Default,
  args: {
    onRemove: () => {},
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at ipsumquam. Aliquam fermentum bibendum vestibulum. Vestibulum condimentum luctusmetus, sed sagittis magna pellentesque eget. Duis dapibus pretium nisi, etvenenatis tortor dignissim ut. Quisque eget lacus ac ex eleifend ultrices.Phasellus facilisis ex sit amet leo elementum condimentum. Ut vel maximusfelis. Etiam eget diam eu eros blandit interdum. Sed eu metus sed justoaliquam iaculis ac sit amet ex. Curabitur justo magna, porttitor nonpulvinar eu, malesuada at leo. Cras mollis consectetur eros, quis maximuslorem dignissim at. Proin in rhoncus massa. Vivamus lectus nunc, fringillaeuismod risus commodo, mattis blandit nulla.',
  },
};

export const Variants = () => (
  <PropsVariationSection
    component={Pill}
    common={{ children: 'Pill' }}
    xAxis={{
      default: {},
    }}
    yAxis={{
      neutral: {},
      info: { variant: 'info' },
      success: { variant: 'success' },
      warning: { variant: 'warning' },
      critical: { variant: 'critical' },
    }}
  />
);

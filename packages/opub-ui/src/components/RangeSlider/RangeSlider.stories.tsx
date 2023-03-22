import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RangeSlider } from './RangeSlider';

/**
 * An input where the user selects a value from within a given range
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/slider
 */
const meta = {
  component: RangeSlider,
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Range Slider',
    defaultValue: [20],
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Range Slider',
    defaultValue: [0],
    min: -20,
    max: 20,
  },
};

export const WithSteps: Story = {
  args: {
    label: 'Range Slider',
    defaultValue: [0],
    min: -20,
    max: 20,
    step: 4,
  },
};

export function PrefixAndSuffix() {
  const [rangeValue, setRangeValue] = React.useState([50]);

  const handleRangeSliderChange = React.useCallback(
    (value: number[]) => setRangeValue(value),
    []
  );

  return (
    <RangeSlider
      output
      label="Budget"
      value={rangeValue}
      onValueChange={(e: number[]) => handleRangeSliderChange(e)}
      prefix={<p>$</p>}
      suffix={<p>{rangeValue}</p>}
    />
  );
}

export const DoubleThumb: Story = {
  args: {
    label: 'Double Slider',
    defaultValue: [20, 40],
  },
};
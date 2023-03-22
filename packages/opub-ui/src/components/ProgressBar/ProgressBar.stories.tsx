import { Meta, StoryObj } from '@storybook/react';
import { PropsVariationSection } from '@ui/utils/helpers';
import { ProgressBar } from './ProgressBar';

/**
 * Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/progress
 */
const meta = {
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const States: Story = {
  render: ({ ...args }) => {
    return (
      <PropsVariationSection
        component={ProgressBar}
        common={{ ...args }}
        xAxis={{
          small: { size: 'small' },
          medium: {},
          large: { size: 'large' },
        }}
        yAxis={{
          highlight: {},
          success: { color: 'success' },
          primary: { color: 'primary' },
          critical: { color: 'critical' },
          'animated: false': { animated: false },
        }}
      />
    );
  },
  args: {
    value: 60,
  },
};

import { Meta, StoryObj } from '@storybook/react';

import { PropsVariationSection } from '../../utils/helpers';
import { ProgressBar } from './ProgressBar';
import styles from './ProgressBar.module.scss';

/**
 * Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/progress
 */
const meta = {
  title: 'Components/ProgressBar',
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
          interactive: { color: 'interactive' },
          success: { color: 'success' },
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

export const RiskStates: Story = {
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
          veryhighrisk: {customColor : "veryhighrisk"},
          highrisk: {customColor : "highrisk"},
          mediumrisk: {customColor : "mediumrisk"},
          lowrisk: {customColor : "lowrisk"},
          verylowrisk: {customColor : "verylowrisk"},
          'animated: false': { animated: false },
        }}
      />
    );
  },
  args: {
    value: 60,
  },
};

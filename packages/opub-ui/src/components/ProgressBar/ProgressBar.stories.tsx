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
    const ColorMap: {
      [key: number]: { backgroundColor: string; indicatorColor: string };
    } = {
      5: { backgroundColor: '#d416057a', indicatorColor: '#D41505' },
      4: { backgroundColor: '#fb8b357a', indicatorColor: '#FB8C35' },
      3: { backgroundColor: '#ffee6e82', indicatorColor: '#FFED6E' },
      2: { backgroundColor: '#65a4bd77', indicatorColor: '#65A4BD' },
      1: { backgroundColor: '#4575b480', indicatorColor: '#4575b4' },
    };
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
          veryhighrisk: { customColor: ColorMap[5] },
          highrisk: { customColor: ColorMap[4] },
          mediumrisk: { customColor: ColorMap[3] },
          lowrisk: { customColor: ColorMap[2] },
          verylowrisk: { customColor: ColorMap[1] },
        }}
      />
    );
  },
  args: {
    value: 60,
  },
};

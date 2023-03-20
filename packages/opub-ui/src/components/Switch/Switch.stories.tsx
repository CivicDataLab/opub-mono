import { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/switch
 */
const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Low Power Mode',
  },
};

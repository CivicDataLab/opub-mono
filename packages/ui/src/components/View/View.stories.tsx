import { Meta } from '@storybook/react';
import { View } from './View';
import { ViewProps } from '@ui/types/view';

/**
 * View is a general purpose container with no specific semantics that can be used for custom styling purposes.
 */
export default {
  component: View,
} as Meta<ViewProps>;

export const Primary = {
  args: {
    children: 'View',
  },
};

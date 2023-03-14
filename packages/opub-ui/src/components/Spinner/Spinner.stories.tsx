import { Meta } from '@storybook/react';
import { Spinner } from './Spinner';

/**
 * Spinners are used to notify users that their action is being processed.
 * For loading states, spinners should only be used for content that can’t be represented with skeleton loading components, like for data charts.
 */
export default {
  component: Spinner,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof Spinner>;

export const Primary = {
  args: {
    label: 'Spinner',
  },
};

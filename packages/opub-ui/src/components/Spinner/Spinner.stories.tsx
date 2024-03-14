import { Meta } from '@storybook/react';

import { Spinner } from './Spinner';

/**
 * Spinners are used to notify users that their action is being processed.
 * For loading states, spinners should only be used for content that can’t be represented with skeleton loading components, like for data charts.
 */
export default {
  title: 'Components/Spinner',
  component: Spinner,

  argTypes: {
    // children: {
    //   control: 'text',
    //   description: 'description text',
    // },
  },
} as Meta<typeof Spinner>;

export const Default = {};

export const Size = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <Spinner />
      <Spinner size={32} />
      <Spinner size={64} />
    </div>
  ),
};

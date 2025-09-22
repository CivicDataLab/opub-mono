import { Meta } from '@storybook/react-vite';

import { Spinner } from './Spinner';

/**
 * Spinners are used to notify users that their action is being processed.
 * For loading states, spinners should only be used for content that can’t be represented with skeleton loading components, like for data charts.
 */
export default {
  title: 'Components/Spinner',
  component: Spinner,
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

export const Color = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <Spinner />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="critical" />
      <Spinner color="interactive" />
      <Spinner color="highlight" />
      <div className="rounded-2 bg-backgroundSolidDark p-2">
        <Spinner color="surface" />
      </div>
    </div>
  ),
};

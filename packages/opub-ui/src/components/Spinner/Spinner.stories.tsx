import { Box } from '../Box';
import { Spinner } from './Spinner';
import { Meta } from '@storybook/react';

/**
 * Spinners are used to notify users that their action is being processed.
 * For loading states, spinners should only be used for content that can’t be represented with skeleton loading components, like for data charts.
 */
export default {
  title: 'Components/Spinner',
  component: Spinner,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof Spinner>;

export const Default = {
  args: {
    label: 'Spinner',
  },
};

export const Colors = {
  render: () => (
    <Box flex alignItems="center" gap="4">
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="critical" />
      <Spinner color="highlight" />
      <Spinner color="text" />
    </Box>
  ),
};

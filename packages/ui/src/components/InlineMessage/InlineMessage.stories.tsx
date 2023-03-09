import { Meta, StoryObj } from '@storybook/react';
import { PropsVariationSection } from '@ui/utils/helpers';
import { InlineMessage } from './InlineMessage';

/**
 * InlineMessage Description
 *
 * Reference: #
 */
const meta = {
  component: InlineMessage,
} satisfies Meta<typeof InlineMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'InlineError',
    fieldID: '123',
  },
};

export const States = () => (
  <PropsVariationSection
    component={InlineMessage}
    common={{}}
    xAxis={{
      states: {},
    }}
    yAxis={{
      error: {
        state: 'error',
        message: 'An error occured while uploading',
        fieldID: 'error',
      },
      success: {
        state: 'success',
        message: 'Files have been uploaded',
        fieldID: 'success',
      },
      warning: {
        state: 'warning',
        message: 'Your bill may increase',
        fieldID: 'warning',
      },
      info: {
        state: 'info',
        message: 'Verifying your status...',
        fieldID: 'info',
      },
    }}
  />
);

import { Meta, StoryObj } from '@storybook/react';
import { PropsVariationSection } from '../../utils/helpers';
import { InlineMessage } from './InlineMessage';

/**
 * An inline message lets users know when important information is available
 */
const meta = {
  component: InlineMessage,
} satisfies Meta<typeof InlineMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is an inline message',
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
        appearance: 'error',
        message: 'An error occured while uploading',
        fieldID: 'error',
      },
      success: {
        appearance: 'success',
        message: 'Files have been uploaded',
        fieldID: 'success',
      },
      warning: {
        appearance: 'warning',
        message: 'Your bill may increase',
        fieldID: 'warning',
      },
      info: {
        appearance: 'info',
        message: 'Verifying your status...',
        fieldID: 'info',
      },
    }}
  />
);

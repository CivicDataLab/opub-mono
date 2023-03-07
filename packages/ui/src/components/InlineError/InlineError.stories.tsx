import { Meta, StoryObj } from '@storybook/react';
import { InlineError } from './InlineError';

/**
 * InlineError Description
 *
 * Reference: #
 */
const meta = {
  component: InlineError,
} satisfies Meta<typeof InlineError>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {
//     children: 'InlineError',
//   },
// };

import { Meta, StoryObj } from '@storybook/react';

import { Collapsible } from './Collapsible';

/**
 * The collapsible component is used to put long sections of information under a block that users can expand or collapse.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/collapsible
 */

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collapsibleHeading:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at laoreet arcu. Sed rutrum sapien nec ipsum aliquet, ut facilisis sapien facilisis. Morbi et mauris sed nisl accumsan ultrices in id mauris.',
    collapsibleContent: [
      'My dummy first collapsible string',
      'My dummy second collapsible string',
    ],
  },
};

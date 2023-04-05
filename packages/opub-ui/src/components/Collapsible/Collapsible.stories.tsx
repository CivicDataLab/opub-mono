import { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { Button } from '../Button';
import { Link } from '../Link';
import Collapsible from './Collapsible';

/**
 * Collapsible Description
 *
 * Reference: #
 */
const meta = {
  component: Collapsible,
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collapsibleHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at laoreet arcu. Sed rutrum sapien nec ipsum aliquet, ut facilisis sapien facilisis. Morbi et mauris sed nisl accumsan ultrices in id mauris.',
    collapsibleContent: [
      'My dummy first collapsible string',
      'My dummy second collapsible string'
    ]
  },
};

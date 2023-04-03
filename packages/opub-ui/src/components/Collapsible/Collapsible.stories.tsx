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

export function Default() {
  return (
      <Collapsible/>
  );
}

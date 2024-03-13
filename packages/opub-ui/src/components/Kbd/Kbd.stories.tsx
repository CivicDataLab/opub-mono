import { Meta, StoryObj } from '@storybook/react';

import { Kbd } from './Kbd';

/**
 * Use the KBD component as an inline element to denote textual user input from the keyboard inside paragraphs, tables, and other components
 */
const meta = {
  title: 'Components/Kbd',
  component: Kbd,
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Shift',
  },
};

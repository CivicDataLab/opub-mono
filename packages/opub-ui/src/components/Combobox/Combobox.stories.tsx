import { Search } from '@opub-icons/workflow';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useMemo, useState } from 'react';
import { Listbox } from '../Listbox';
import { Combobox } from './Combobox';

/**
 * Combobox Description
 *
 * Reference: #
 */
const meta = {
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export function Default() {
  const options = useMemo(
    () => [
      { value: 'rustic', label: 'Rustic' },
      { value: 'antique', label: 'Antique' },
      { value: 'vinyl', label: 'Vinyl' },
      { value: 'vintage', label: 'Vintage' },
      { value: 'refurbished', label: 'Refurbished' },
    ],
    []
  );
  const initialSelectedItems = [options[0]];

  return (
    <Combobox
      label="Pick some books:"
      allItems={options}
      initialSelectedItems={initialSelectedItems}
    />
  );
}

import { ChevronDown, ChevronUp } from '@opub-icons/workflow';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { Select } from './Select';

/**
 * Select lets user choose one option from an options menu. Consider select when you have 4 or more options, to avoid cluttering the interface.
 *
 * Reference: https://polaris.shopify.com/components/selection-and-input/select
 */
const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export function Default({ ...props }) {
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    []
  );

  const options = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'lastWeek' },
  ];

  return (
    <Select
      label="Date range"
      options={options}
      onChange={handleSelectChange}
      value={selected}
      {...props}
    />
  );
}

export function InlineLabel({ ...props }) {
  const [selected, setSelected] = useState('newestUpdate');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    []
  );

  const options = [
    { label: 'Newest update', value: 'newestUpdate' },
    { label: 'Oldest update', value: 'oldestUpdate' },
    { label: 'Most spent', value: 'mostSpent' },
    { label: 'Most orders', value: 'mostOrders' },
    { label: 'Last name A–Z', value: 'lastNameAlpha' },
    { label: 'Last name Z–A', value: 'lastNameReverseAlpha' },
  ];

  return (
    <Select
      label="Sort by"
      labelInline
      options={options}
      onChange={handleSelectChange}
      value={selected}
      {...props}
    />
  );
}

export function Disabled({ ...props }) {
  return (
    <Select
      label="Date range"
      disabled
      options={[
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 days', value: 'lastWeek' },
      ]}
      {...props}
    />
  );
}

export function Prefix({ ...props }) {
  const [selected, setSelected] = useState('enabled');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    []
  );

  const options = [
    {
      label: 'Increase',
      value: 'Increase',
      prefix: <ChevronUp />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
      prefix: <ChevronDown />,
    },
  ];

  return (
    <Select
      label="Permission"
      options={options}
      onChange={handleSelectChange}
      value={selected}
      {...props}
    />
  );
}

export function Error({ ...props }) {
  const [selected, setSelected] = useState('');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    []
  );

  return (
    <Select
      label="Province"
      options={['Bangaluru']}
      value={selected}
      onChange={handleSelectChange}
      error="Province is required"
      {...props}
    />
  );
}

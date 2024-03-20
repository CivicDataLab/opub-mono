import { useCallback, useState } from 'react';
import { Meta } from '@storybook/react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

import { Select } from '../Form/components/Select';
import { Icon } from '../Icon';

/**
 * Select lets user choose one option from an options menu. Consider select when you have 4 or more options, to avoid cluttering the interface.
 *
 * Reference: https://polaris.shopify.com/components/selection-and-input/select
 */
const meta = {
  title: 'Components/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

export function Default({ ...props }) {
  const options = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'lastWeek' },
  ];

  return (
    <Select
      label="Date range"
      options={options}
      defaultValue={'yesterday'}
      onChange={(val, name) => console.log(val, name)}
      name="select-1"
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
      name="select-1"
      {...props}
    />
  );
}

export function Disabled({ ...props }) {
  return (
    <Select
      label="Date range"
      name="select-1"
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
// TODO: Using icon prefix crashes the browser
// export function Prefix({ ...props }) {
//   const [selected, setSelected] = useState('Decrease');

//   const handleSelectChange = useCallback(
//     (value: string) => setSelected(value),
//     []
//   );

//   const options = [
//     {
//       label: 'Increase',
//       value: 'Increase',
//       prefix: <Icon source={IconChevronUp} />,
//     },
//     {
//       label: 'Decrease',
//       value: 'Decrease',
//       prefix: <Icon source={IconChevronDown} />,
//     },
//   ];

//   return (
//     <Select
//       name="select-21"
//       label="Permission"
//       options={options}
//       onChange={handleSelectChange}
//       value={selected}
//       {...props}
//     />
//   );
// }

export function Error({ ...props }) {
  const [selected, setSelected] = useState('Bangaluru');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    []
  );

  return (
    <Select
      label="Province"
      name="select-1"
      options={['Bangaluru', 'Mumbai', 'Delhi']}
      value={selected}
      onChange={handleSelectChange}
      error={selected === 'Bangaluru' ? 'Bengaluru not allowed' : undefined}
      {...props}
    />
  );
}

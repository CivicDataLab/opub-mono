import { Meta, StoryObj } from '@storybook/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useCallback, useState } from 'react';
import { DataTable } from './DataTable';

/**
 * Data tables are used to organize and display all information from a data set.
 *
 * Reference: https://tanstack.com/table/v8/docs/guide/introduction
 */
const meta = {
  component: DataTable,
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const tableData: Person[] = [
  {
    firstName: 'Tanner',
    lastName: 'Linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'Tandy',
    lastName: 'Miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'Joe',
    lastName: 'Dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const columnContentTypes: Array<'text' | 'numeric'> = [
  'text',
  'text',
  'numeric',
  'numeric',
  'numeric',
  'text',
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    header: () => <>First Name</>,
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    header: 'Last Name',
    enableSorting: false,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('visits', {
    header: 'Visits',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    enableSorting: false,
  }),
];

export const Default: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: tableData,
    columns: columns,
  },
};

export const ZebraStriping: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: tableData,
    columns: columns,
    hasZebraStripingOnData: true,
  },
};

export const IncreasedDensity: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: tableData,
    columns: columns,
    increasedTableDensity: true,
  },
};

const truncateData: Person[] = [
  {
    firstName: 'Tanner',
    lastName: 'Linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'Tandy',
    lastName: 'Miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName:
      'This is a super long name to trigger the truncation of the table cell',
    lastName: 'Dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

export const Truncate: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: truncateData,
    columns: columns,
    truncate: true,
  },
};

function sortCurrency(
  rows: any,
  index: number,
  direction: 'ascending' | 'descending'
) {
  return [...rows].sort((rowA, rowB) => {
    const amountA = parseFloat((rowA[index] || 0).toString().substring(1));
    const amountB = parseFloat((rowB[index] || 0).toString().substring(1));

    return direction === 'descending' ? amountB - amountA : amountA - amountB;
  });
}

export const Sortable: Story = {
  render: ({ ...args }) => {
    const [sortedRows, setSortedRows] = useState<any>(null);

    const handleSort = useCallback(
      (index: number, direction: 'ascending' | 'descending') =>
        setSortedRows(sortCurrency(tableData, index, direction)),
      [tableData]
    );

    return (
      <DataTable
        {...args}
        sortable={[false, true, false, false, true]}
        defaultSortDirection="descending"
        initialSortColumnIndex={4}
        onSort={handleSort}
        rows={sortedRows || tableData}
      />
    );
  },

  args: {
    columnContentTypes: columnContentTypes,
    rows: tableData,
    columns: columns,
  },
};
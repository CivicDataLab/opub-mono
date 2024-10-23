import { Meta, StoryObj } from '@storybook/react';
import { createColumnHelper } from '@tanstack/react-table';

import { Table } from './Table';
import { makeTableData, Person } from './utils';

const data = makeTableData(100);

/**
 * Data tables are used to organize and display all information from a data set.
 *
 * Reference: https://tanstack.com/table/v8/docs/guide/introduction
 */
const meta = {
  title: 'Components/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    header: () => 'First Name',
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    header: 'Last Name',
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
  }),
];

export const Default: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: data,
    columns: columns,
  },
};

export const DefaultWithClimateTheme: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: data,
    columns: columns,
    theme: 'climate',
  },
};

export const WithoutFooter: Story = {
  args: {
    ...Default.args,
    rows: data.slice(0, 20),
    hideFooter: true,
  },
};

export const ZebraStriping: Story = {
  args: {
    ...Default.args,
    hasZebraStripingOnData: true,
  },
};

export const IncreasedDensity: Story = {
  args: {
    ...Default.args,
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
    lastName:
      'This is a super long name to trigger the truncation of the table cell',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
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
];

export const Truncate: Story = {
  args: {
    ...Default.args,
    rows: truncateData,
    truncate: true,
  },
};

const columnsSort = [
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

export const Sortable: Story = {
  args: {
    ...Default.args,
    columns: columnsSort,
    initialSortColumnIndex: 4,
    defaultSortDirection: 'desc',
    sortColumns: ['firstName', 'lastName', 'visits', 'progress', 'status'],
  },
};

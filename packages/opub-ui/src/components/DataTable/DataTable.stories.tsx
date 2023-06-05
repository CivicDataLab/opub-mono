import { Icon } from '../Icon';
import { makeTableData, Person } from '../Table/utils';
import { createColumnHelper, DataTable } from './DataTable';
import { Meta, StoryObj } from '@storybook/react';
import { IconCopy, IconPencil, IconTrash } from '@tabler/icons-react';

/**
 * Data tables are used to organize and display all information from a dataset.
 *
 * Reference: https://tanstack.com/table/v8/docs/guide/introduction
 */
const meta = {
  component: DataTable,
} satisfies Meta<typeof DataTable>;

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
    filterFn: 'columnFilter',
  }),
];

const rowActions = [
  {
    content: 'Copy',
    icon: <Icon source={IconCopy} />,
    onAction: () => alert('Copy Triggered'),
  },
  {
    content: 'Edit',
    icon: <Icon source={IconPencil} />,
    onAction: () => alert('Edit Triggered'),
  },
  {
    content: 'Delete',
    destructive: true,
    icon: <Icon source={IconTrash} />,
    onAction: () => alert('Delete Triggered'),
  },
];

export const Default: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(30),
    columns: columns,
  },
};

export const statusFilter = [
  {
    label: 'Relationship',
    value: 'relationship',
  },
  {
    label: 'Complicated',
    value: 'complicated',
  },
  {
    label: 'Single',
    value: 'single',
  },
];

export const AllFeatures: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(40),
    columns: columns,
    addToolbar: true,
    rowActions: rowActions,
    filters: [
      {
        columnId: 'status',
        options: statusFilter,
      },
    ],
  },
};

export const WithActions: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(30),
    columns: columns,
    rowActions: rowActions,
  },
};

export const WithFilter: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(30),
    columns: columns,
    addToolbar: true,
    filters: [
      {
        columnId: 'status',
        options: statusFilter,
      },
    ],
  },
};

export const ZebraStriping: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(30),
    columns: columns,
    hasZebraStripingOnData: true,
  },
};

export const IncreasedDensity: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(30),
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

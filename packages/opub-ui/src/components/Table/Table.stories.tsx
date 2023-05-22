import { Table } from './Table';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

type Person = {
  firstName: any;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  };
};

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(100);

export async function fetchData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
  };
}

/**
 * Data tables are used to organize and display all information from a data set.
 *
 * Reference: https://tanstack.com/table/v8/docs/guide/introduction
 */
const meta = {
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
  render: ({ ...args }) => {
    // const [data, setData] = React.useState(() => makeData(100000));

    return <Table {...args} rows={data} />;
  },
  args: {
    columnContentTypes: columnContentTypes,
    rows: data,
    columns: columns,
  },
};

export const StickyHeader: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: data,
    columns: columns,
    stickyHeader: true,
  },
};

export const ZebraStriping: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: data,
    columns: columns,
    hasZebraStripingOnData: true,
  },
};

export const IncreasedDensity: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: data,
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
  render: ({ ...args }) => {
    const [sortedRows, setSortedRows] = useState<any>(null);

    return (
      <Table
        {...args}
        sortable={true}
        defaultSortDirection="desc"
        initialSortColumnIndex={4}
        rows={sortedRows || data}
      />
    );
  },

  args: {
    columnContentTypes: columnContentTypes,
    rows: data,
    columns: columnsSort,
  },
};

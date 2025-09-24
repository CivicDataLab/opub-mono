import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { IconCopy, IconPencil, IconTrash } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';

import { Button } from '../Button';
import { makeTableData, Person } from '../Table/utils';
import { TextField } from '../TextField';
import { DataTable } from './DataTable';

/**
 * Data tables are used to organize and display all information from a dataset.
 *
 * Reference: https://tanstack.com/table/v8/docs/guide/introduction
 */
const meta = {
  title: 'Components/DataTable',
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
    icon: IconCopy,
    onAction: (e: any) => {
      console.log(e, ' copied');
    },
  },
  {
    content: 'Edit',
    icon: IconPencil,
    onAction: (e: any) => {
      console.log(e, ' edited');
    },
  },
  {
    content: 'Delete',
    destructive: true,
    icon: IconTrash,
    onAction: (e: any) => {
      console.log(e, ' deleted');
    },
  },
];

export const Default: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(30),
    columns: columns,
  },
};

const statusFilter = [
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
    hideSelection: true,
    sortColumns: ['firstName', 'lastName', 'visits', 'progress', 'status'],
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

export const WithSort: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(30),
    columns: columns,
    sortColumns: ['firstName', 'lastName', 'visits', 'progress', 'status'],
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
    action: 'Action',
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

const actionColumn = [
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
  columnHelper.accessor('action', {
    header: 'Action',
    cell: ({ row }) => (
      <Button
        size="slim"
        kind="secondary"
        onClick={(e) => {
          e.stopPropagation();
          console.log(row.original);
        }}
      >
        Delete
      </Button>
    ),
  }),
];

export const customAction: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: truncateData,
    columns: actionColumn,
    truncate: true,
  },
};

const editableColumn = [
  columnHelper.accessor('firstName', {
    cell: (info) => {
      return (
        <TextField
          label="First Name"
          labelHidden
          name="firstName"
          type="text"
          defaultValue={info.getValue()}
        />
      );
    },
    header: () => 'First Name',
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    header: 'Last Name',
    cell: (info) => {
      return (
        <TextField
          label="Last Name"
          labelHidden
          name="lastName"
          type="text"
          defaultValue={info.getValue()}
        />
      );
    },
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => {
      return (
        <TextField
          label="Age"
          labelHidden
          name="age"
          type="number"
          defaultValue={String(info.getValue())}
        />
      );
    },
  }),
];

export const EditableFields: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(30),
    columns: editableColumn,
  },
};

// fetching a dummy api here
const fetchApiData = async (pageSize: number, pageIndex: number) => {
  try {
    const result = await fetch(
      `https://dummyjson.com/products?limit=${pageSize}&skip=${pageIndex}`
    ).then((res) => res.json());

    return result.products;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const ApiColumnContentTypes: Array<'text' | 'numeric'> = [
  'text',
  'text',
  'numeric',
  'numeric',
];

const ApiColumns = [
  {
    header: 'title',
    accessorKey: 'title',
  },
  {
    header: 'category',
    accessorKey: 'category',
  },
  {
    header: 'price',
    accessorKey: 'price',
  },
  {
    header: 'stock',
    accessorKey: 'stock',
  },
];

export const WithCustomPagination: Story = {
  args: {
    columnContentTypes: ApiColumnContentTypes,
    rows: [],
    columns: ApiColumns,
  },
  parameters: {
    pagination: {
      pageSize: 10,
      pageIdx: 0,
    },
  },
  loaders: [
    async (context: any) => {
      const { pageIdx, pageSize } = context.parameters.pagination;
      const rowsData = await fetchApiData(pageSize, pageIdx);
      return { rowsData };
    },
  ],
  render: (args: any, context: any) => {
    const { rowsData } = context.loaded;

    const [pageData, setPageData] = useState(rowsData);
    const [pageIdx, setPageIdx] = useState(
      context.parameters.pagination.pageIdx
    );
    const [pageSize, setPageSize] = useState(
      context.parameters.pagination.pageSize
    );
    const totalPages = 197;

    const paginationControls = {
      goToFirstPage: async () => {
        console.log('first page');
        const rowsData = await fetchApiData(pageSize, 1);
        setPageData(rowsData);
        setPageIdx(0);
      },
      goToPreviousPage: async () => {
        const prevPageIndex = Math.max(pageIdx - pageSize, 0);
        const rowsData = await fetchApiData(pageSize, prevPageIndex);
        setPageData(rowsData);
        setPageIdx(prevPageIndex);
        console.log('previous page');
      },
      goToNextPage: async () => {
        const nextPageIndex = Math.min(pageIdx + 1 * pageSize)
        const rowsData = await fetchApiData(pageSize, nextPageIndex);
        setPageData(rowsData);
        setPageIdx(nextPageIndex);
        console.log('next page');
      },
      goToLastPage: async () => {
        console.log('last page');
        const lastPageIndex = Math.floor(totalPages / pageSize) * pageSize;
        const rowsData = await fetchApiData(pageSize, lastPageIndex);
        setPageData(rowsData);
        setPageIdx(lastPageIndex);
      },
    };

    const handlePageSizeChange = async (newPageSize: number) => {
      setPageSize(newPageSize);
      setPageIdx(1);
      const rowsData = await fetchApiData(newPageSize, pageIdx);
      setPageData(rowsData);
    };

    return pageData ? (
      <DataTable
        {...args}
        rows={pageData}
        handlePageSizeChange={handlePageSizeChange}
        pageIdx={pageIdx}
        pageSize={pageSize}
        totalPages={totalPages}
        isCustomization={true}
        paginationControls={paginationControls}
      />
    ) : (
      <div>Loading...</div>
    );
  },
};

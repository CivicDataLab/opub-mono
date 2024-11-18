import { Meta, StoryObj } from '@storybook/react';
import { IconCopy, IconPencil, IconTrash } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';

import { Button } from '../Button';
import { makeTableData, Person, apiData } from '../Table/utils';
import { TextField } from '../TextField';
import { DataTable } from './DataTable';
// import { useState, useEffect } from 'react';
// import { useArgs } from '@storybook/preview-api';
import { useArgs, useState, useEffect } from "@storybook/client-api";

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


const columnsapi = [
  {
    header: 'category',
    accessorKey: 'category'
  },
  {
    header: 'brand',
    accessorKey: 'brand'
  },
  {
    header: 'price',
    accessorKey: 'price'
  },
  {
    header: 'stock',
    accessorKey: 'stock'
  },
]

const fetchApiData = async (pageSize: number, pageIndex: number) => {
  console.log('in api call');
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${pageIndex}`)
    console.log(`https://dummyjson.com/products?limit=${pageSize}&skip=${pageIndex}`, 'api call');
    const result = await response.json();
    console.log(result.products, 'res');
    return result.products;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const rowData = await fetchApiData(10, 0);
const [rows, setRows] = useState(rowData);

export const WithCustomPagination: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: rows,
    columns: columnsapi,
    // showPagination: true,
    isCustomization: true,
  },

  render: (args) => {
    console.log(args.rows, 'args-rows');
    const [pageIdx, setPageIdx] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const totalPages = 197;
    const [, updateArgs] = useArgs();
    console.log(updateArgs, 'updateargs');

    useEffect(() => {
      console.log('apicall');
      fetchData(pageSize, pageIdx);
    }, [pageSize, pageIdx, args]);

    const fetchData = async (pageSize: number, pageIdx: number) => {
      const fetchedData = await fetchApiData(pageSize, pageIdx);
      // updateArgs({ rows: fetchedData });
      setRows(fetchedData);
      console.log(args.rows, fetchedData, 'data');
    };
    //   console.log('in api call');
    //   try {
    //     const response = await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${pageIndex}`)
    //     console.log(`https://dummyjson.com/products?limit=${pageSize}&skip=${pageIndex}`, 'api call');
    //     const result = await response.json();
    //     console.log(result.products, 'res');
    //     return result.products;
    //   } catch (error) {
    //     console.error('Failed to fetch data:', error);
    //   }
    // };

    const handlePageSizeChange = (newPageSize: number) => {
      setPageSize(newPageSize);
      setPageIdx(1);
      fetchData(pageSize, pageIdx);
    };

    const paginationControls = {
      goToFirstPage: () => {
        console.log('first page');
        fetchData(pageSize, 1);
        // fetchApiData(pageSize, 1);
        setPageIdx(0);
      },
      goToPreviousPage: () => {
        const prevPageIndex = Math.max(pageIdx - 1, 0);
        fetchData(pageSize, prevPageIndex);
        // fetchApiData(pageSize, prevPageIndex);
        setPageIdx(prevPageIndex);
        console.log('previous page');
      },
      goToNextPage: () => {
        const nextPageIndex = pageIdx + pageSize;
        fetchData(pageSize, nextPageIndex);
        setPageIdx(nextPageIndex);
        console.log('next page');
      },
      goToLastPage: () => {
        console.log('last page');
        const lastPageIndex = Math.ceil(totalPages / pageSize) - 1;
        fetchData(pageSize, lastPageIndex);
        fetchApiData(pageSize, lastPageIndex);
        setPageIdx(lastPageIndex);
      }
    };
    return <DataTable {...args} handlePageSizeChange={handlePageSizeChange} pageIdx={pageIdx} pageSize={pageSize} totalPages={totalPages} paginationControls={paginationControls} />;
  }
};
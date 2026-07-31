import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCopy,
  IconInfoCircle,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';

import type {
  FilterField,
  SortField,
  TablePaginationState,
} from '../../types/datatable';
import { Button } from '../Button';
import { makeTableData, Person } from '../Table/utils';
import { TextField } from '../TextField';
import { DataTable } from './DataTable';
import { applyCondition } from './filterUtils';

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
        type: 'multiSelect',
        options: statusFilter,
      },
      {
        columnId: 'firstName',
        type: 'text',
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

export const WithColumnFilters: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: makeTableData(40),
    columns: columns,
    hideSelection: true,
    showFilterChips: true,
    sortColumns: [
      'firstName',
      'lastName',
      'age',
      'visits',
      'progress',
      'status',
    ],
    filters: [
      {
        columnId: 'firstName',
        type: 'text',
      },
      {
        columnId: 'age',
        type: 'numeric',
        isRange: true,
      },
      {
        columnId: 'status',
        type: 'multiSelect',
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

const longTextData: Person[] = [
  {
    firstName:
      'This is an extremely long first name that should definitely trigger truncation and show a tooltip when you hover over it',
    lastName:
      'This is also a very long last name that will overflow the cell boundaries and require truncation with ellipsis',
    age: 24,
    visits: 100,
    status:
      'This status text is way too long to fit in a normal table cell and should be truncated with a tooltip showing the full text on hover',
    progress: 50,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    visits: 250,
    status:
      'Another super long status message that contains a lot of information and will definitely overflow the cell width and need truncation',
    progress: 75,
  },
  {
    firstName:
      'Mary Jane Watson Parker Thompson Anderson Williams Johnson Smith',
    lastName:
      'A very long compound last name that combines multiple family names together',
    age: 45,
    visits: 500,
    status: 'Single',
    progress: 90,
  },
  {
    firstName: 'Short',
    lastName: 'Name',
    age: 20,
    visits: 50,
    status:
      'This is a complicated relationship status with lots of additional details that explain the current situation in great detail',
    progress: 25,
  },
  {
    firstName:
      'Alexander The Great Conqueror Of Many Lands And Territories Throughout The Known World',
    lastName: 'Macedon',
    age: 32,
    visits: 1000,
    status: 'In Relationship',
    progress: 100,
  },
];

export const TruncateWithLongText: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: longTextData,
    columns: columns,
    truncate: true,
    hoverable: true,
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
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Category',
    accessorKey: 'category',
  },
  {
    header: 'Price',
    accessorKey: 'price',
  },
  {
    header: 'Stock',
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
        const nextPageIndex = Math.min(pageIdx + 1 * pageSize);
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

export const WithServer: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: [],
    columns: columns,
    withServer: true,
    hideSelection: true,
    showFilterChips: true,
    sortColumns: [
      'firstName',
      'lastName',
      'age',
      'visits',
      'progress',
      'status',
    ],
    filters: [
      { columnId: 'firstName', type: 'text' },
      { columnId: 'age', type: 'numeric', isRange: true },
      {
        columnId: 'status',
        type: 'multiSelect',
        options: statusFilter,
      },
    ],
  },
  render: (args) => {
    const [rows, setRows] = useState<Person[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [filters, setFilters] = useState<FilterField[]>([]);
    const [sorting, setSorting] = useState<SortField[]>([]);
    const [pagination, setPagination] = useState<TablePaginationState>({
      limit: 10,
      offset: 0,
    });
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
      let cancelled = false;

      const load = async () => {
        setLoading(true);
        try {
          const result = await fetchPeoplePage({
            filters,
            sorting,
            pagination,
          });
          if (cancelled) return;
          setRows(result.data);
          setTotalRows(result.totalRows);
        } finally {
          if (!cancelled) setLoading(false);
        }
      };

      load();
      return () => {
        cancelled = true;
      };
    }, [filters, sorting, pagination]);

    return (
      <div>
        {/* {loading && <div style={{ marginBottom: 8 }}>Loading…</div>} */}
        {/* <pre style={{ fontSize: 12, marginBottom: 8 }}>
          {JSON.stringify({ filters, sorting, pagination }, null, 2)}
        </pre> */}
        <DataTable
          {...args}
          rows={rows}
          totalRows={totalRows}
          filterState={filters}
          sortingState={sorting}
          paginationState={pagination}
          onFiltersChange={setFilters}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          emptyState={
            <div className="flex items-center gap-2 text-center">
              <IconInfoCircle />
              No data found for the current filters
            </div>
          }
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: [],
    columns: columns,
    hideSelection: true,
    labels: { empty: 'No records match your filters' },
    showFilterChips: true,
    sortColumns: ['firstName', 'status'],
    filters: [
      { columnId: 'firstName', type: 'text' },
      {
        columnId: 'status',
        type: 'multiSelect',
        options: statusFilter,
      },
    ],
  },
};

/** Fake dataset for the server story — regenerated once per Storybook session. */
const SERVER_DATASET: Person[] = makeTableData(87);

function getPersonField(row: Person, field: string): unknown {
  return row[field as keyof Person];
}

/**
 * Simulates a server: filter → sort → paginate with a small delay.
 * Uses the same condition helpers as client-side filtering.
 */
async function fetchPeoplePage({
  filters,
  sorting,
  pagination,
}: {
  filters: FilterField[];
  sorting: SortField[];
  pagination: TablePaginationState;
}): Promise<{ data: Person[]; totalRows: number }> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  let next = [...SERVER_DATASET];

  if (filters.length) {
    next = next.filter((row) =>
      filters.every((filter) =>
        applyCondition(
          getPersonField(row, filter.field),
          filter.condition,
          filter.value
        )
      )
    );
  }

  if (sorting.length) {
    const [{ field, direction }] = sorting;
    next.sort((a, b) => {
      const left = getPersonField(a, field);
      const right = getPersonField(b, field);
      if (left == null && right == null) return 0;
      if (left == null) return 1;
      if (right == null) return -1;
      if (typeof left === 'number' && typeof right === 'number') {
        return direction === 'asc' ? left - right : right - left;
      }
      const cmp = String(left).localeCompare(String(right));
      return direction === 'asc' ? cmp : -cmp;
    });
  }

  const { limit, offset } = pagination;
  return {
    data: next.slice(offset, offset + limit),
    totalRows: next.length,
  };
}

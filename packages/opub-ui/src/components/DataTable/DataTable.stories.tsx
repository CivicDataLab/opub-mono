import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCopy,
  IconDatabase,
  IconInfoCircle,
  IconPencil,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';

import type {
  FilterField,
  SortField,
  TablePaginationState,
} from '../../types/datatable';
import { Button } from '../Button';
import { Icon } from '../Icon';
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

function ServerQueryPreview({
  filters,
  sorting,
}: {
  filters: FilterField[];
  sorting: SortField[];
}) {
  const blocks = [
    { title: 'filters', value: filters },
    { title: 'sorting', value: sorting },
  ] as const;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 12,
        marginBottom: 16,
      }}
    >
      {blocks.map((block) => (
        <section
          key={block.title}
          style={{
            border: '1px solid var(--border-subdued, #d9d9d9)',
            borderRadius: 8,
            padding: 12,
            background: 'var(--surface, #fff)',
            minWidth: 0,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
            {block.title}
          </div>
          <pre
            style={{
              margin: 0,
              fontSize: 12,
              lineHeight: 1.45,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {JSON.stringify(block.value, null, 2)}
          </pre>
        </section>
      ))}
    </div>
  );
}

type ProductRow = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
};

const PRODUCT_CATEGORIES = [
  'beauty',
  'fragrances',
  'furniture',
  'groceries',
  'home-decoration',
  'kitchen-accessories',
  'laptops',
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'mobile-accessories',
  'motorcycle',
  'skin-care',
  'smartphones',
  'sports-accessories',
  'sunglasses',
  'tablets',
  'tops',
  'vehicle',
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
];

const productCategoryOptions = PRODUCT_CATEGORIES.map((value) => ({
  value,
  label: value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' '),
}));

const productColumns = [
  {
    accessorKey: 'title',
    header: 'Title',
    size: 220,
    meta: { truncate: true },
  },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'stock', header: 'Stock' },
  { accessorKey: 'rating', header: 'Rating' },
];

export const WithServer: Story = {
  args: {
    columnContentTypes: ['text', 'text', 'numeric', 'numeric', 'numeric'],
    rows: [],
    columns: productColumns,
    withServer: true,
    hideSelection: true,
    showFilterChips: true,
    sortColumns: ['title', 'category', 'price', 'stock', 'rating'],
    filters: [
      { columnId: 'title', type: 'text' },
      {
        columnId: 'category',
        type: 'select',
        options: productCategoryOptions,
      },
    ],
  },
  render: (args) => {
    const [rows, setRows] = useState<ProductRow[]>([]);
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
          const result = await fetchProductsPage({
            filters,
            sorting,
            pagination,
          });
          if (cancelled) return;
          setRows(result.data);
          setTotalRows(result.totalRows);
        } catch (error) {
          console.error('Failed to fetch products:', error);
          if (!cancelled) {
            setRows([]);
            setTotalRows(0);
          }
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
        <ServerQueryPreview filters={filters} sorting={sorting} />
        <DataTable
          {...args}
          rows={rows}
          totalRows={totalRows}
          loading={loading}
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

type DatasetSearchRow = {
  id: string;
  title: string;
  geography: string;
  sector: string;
  format: string;
  tags: string;
  modified: string;
  downloads: number;
};

const DATASET_GEOGRAPHIES = [
  'Assam',
  'India',
  'Odisha',
  'Himachal Pradesh',
  'Uttar Pradesh',
  'Asia Pacific',
  'Bangkok',
  'Bihar',
  'Manipur',
  'Punjab',
];

const DATASET_SECTORS = [
  'Climate Action',
  'Disaster Risk Reduction',
  'Urban Development',
  'Gender',
  'Public Finance',
  'Law And Justice',
  'Child Rights',
  'Coastal',
];

const DATASET_FORMATS = ['CSV', 'PDF', 'XLSX', 'JSON', 'ZIP', 'XLS'];

const DATASET_TAGS = [
  'Climate Action',
  'Disaster',
  'Budget',
  'Assam',
  'Floods',
  'Exposure',
  'odia',
  'Gender',
  'Climate',
  'Government Tenders',
];

function optionList(values: string[]) {
  return values.map((value) => ({ value, label: value }));
}

function joinList(values: unknown) {
  return Array.isArray(values) ? values.filter(Boolean).join(', ') : '';
}

function formatDatasetDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const datasetColumns = [
  {
    accessorKey: 'title',
    header: 'Dataset',
    size: 220,
    searchable: true,
    meta: { truncate: true },
    cell: ({ getValue }: { getValue: () => string }) => (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          minWidth: 0,
        }}
      >
        <span style={{ display: 'flex', flexShrink: 0 }}>
          <Icon source={IconDatabase} size={16} color="subdued" />
        </span>
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0,
          }}
        >
          {getValue()}
        </span>
      </span>
    ),
  },
  { accessorKey: 'geography', header: 'Geography' },
  {
    accessorKey: 'sector',
    header: 'Sector',
    size: 120,
    meta: { truncate: true },
  },
  { accessorKey: 'format', header: 'Format', meta: { truncate: true } },
  { accessorKey: 'tags', header: 'Tags', size: 120, meta: { truncate: true } },
  {
    accessorKey: 'modified',
    header: 'Updated',
    size: 120,
    cell: ({ getValue }: { getValue: () => string }) =>
      formatDatasetDate(getValue()),
  },
  { accessorKey: 'downloads', header: 'Downloads', size: 100 },
];

export const WithServerDatasets: Story = {
  args: {
    columnContentTypes: [
      'text',
      'text',
      'text',
      'text',
      'text',
      'text',
      'numeric',
    ],
    rows: [],
    columns: datasetColumns,
    withServer: true,
    hideSelection: true,
    title: 'Datasets',
    subtitle: () => 'Search datasets on CivicDataSpace.',
    addLabel: 'Create dataset',
    onAdd: () => undefined,
    placeholder: 'Search datasets...',
    sortColumns: ['title', 'modified'],
    filters: [
      {
        columnId: 'geography',
        type: 'select',
        options: optionList(DATASET_GEOGRAPHIES),
      },
      {
        columnId: 'sector',
        type: 'multiSelect',
        options: optionList(DATASET_SECTORS),
      },
      {
        columnId: 'tags',
        type: 'multiSelect',
        options: optionList(DATASET_TAGS),
      },
    ],
    statuses: DATASET_FORMATS.map((format) => ({
      key: format,
      label: format,
    })),
  },
  render: (args) => {
    const [rows, setRows] = useState<DatasetSearchRow[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [statusCounts, setStatusCounts] = useState<Record<string, number>>({
      all: 0,
    });
    const [filters, setFilters] = useState<FilterField[]>([]);
    const [sorting, setSorting] = useState<SortField[]>([]);
    const [pagination, setPagination] = useState<TablePaginationState>({
      limit: 10,
      offset: 0,
    });
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    const selectFormat = (nextStatus: string) => {
      setStatus(nextStatus);
      setFilters((current) => {
        const rest = current.filter((filter) => filter.field !== 'format');
        if (nextStatus === 'all') return rest;
        return [
          ...rest,
          { field: 'format', condition: 'exact', value: nextStatus },
        ];
      });
    };

    React.useEffect(() => {
      let cancelled = false;

      const load = async () => {
        setLoading(true);
        try {
          const result = await fetchDatasetSearch({
            search,
            filters,
            sorting,
            pagination,
          });
          if (cancelled) return;
          setRows(result.data);
          setTotalRows(result.totalRows);
          setStatusCounts(result.statusCounts);
        } catch (error) {
          console.error('Failed to fetch datasets:', error);
          if (!cancelled) {
            setRows([]);
            setTotalRows(0);
          }
        } finally {
          if (!cancelled) setLoading(false);
        }
      };

      load();
      return () => {
        cancelled = true;
      };
    }, [search, filters, sorting, pagination]);

    return (
      <div>
        <ServerQueryPreview filters={filters} sorting={sorting} />
        <DataTable
          {...args}
          rows={rows}
          totalRows={totalRows}
          loading={loading}
          searchState={search}
          onSearchChange={setSearch}
          statusState={status}
          onStatusChange={selectFormat}
          statusCounts={statusCounts}
          filterState={filters}
          sortingState={sorting}
          paginationState={pagination}
          onFiltersChange={(next) => {
            setFilters(next);
            const format = next.find(
              (filter) =>
                filter.field === 'format' && filter.condition === 'exact'
            );
            setStatus(format?.value || 'all');
          }}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          getRowActions={(row) => [
            {
              key: 'edit',
              icon: IconPencil,
              label: `Edit ${row.title}`,
              onClick: () => undefined,
            },
            {
              key: 'publish',
              icon: (
                <Icon
                  source={IconUpload}
                  color="success"
                  stroke={1.5}
                  size={20}
                />
              ),
              label: `Publish ${row.title}`,
              onClick: () => undefined,
              alert: {
                title: 'Publish dataset?',
                children: `Publish "${row.title}" so it is visible on CivicDataSpace?`,
                primaryAction: {
                  content: 'Publish',
                  onAction: () => undefined,
                },
                secondaryActions: [{ content: 'Keep as draft' }],
              },
            },
            {
              key: 'delete',
              icon: IconTrash,
              label: `Delete `,
              destructive: true,
              onClick: () => undefined,
              alert: {
                title: 'Delete dataset?',
                children: `Deleting "${row.title}" will permanently remove it. This action cannot be undone.`,
              },
            },
          ]}
          emptyState={
            <div className="flex h-full items-center justify-center gap-2 text-center">
              <IconInfoCircle />
              No data found for the current filters
            </div>
          }
        />
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    columnContentTypes: columnContentTypes,
    rows: [],
    columns: columns,
    loading: true,
    withServer: true,
    totalRows: 48,
    defaultRowCount: 10,
    hideSelection: true,
    title: 'Datasets',
    subtitle: 'Search datasets on CivicDataSpace.',
    placeholder: 'Search datasets...',
    onSearchChange: () => undefined,
    getRowActions: () => [],
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

/**
 * DummyJSON products — the same API as With Custom Pagination.
 * Title search uses `/products/search`, a single category uses
 * `/products/category/:category`, and sort/page use `sortBy`, `order`,
 * `limit`, and `skip`.
 */
async function fetchProductsPage({
  search = '',
  filters,
  sorting,
  pagination,
}: {
  search?: string;
  filters: FilterField[];
  sorting: SortField[];
  pagination: TablePaginationState;
}): Promise<{ data: ProductRow[]; totalRows: number }> {
  const params = new URLSearchParams({
    limit: String(pagination.limit),
    skip: String(pagination.offset),
  });
  const sort = sorting[0];
  if (sort) {
    params.set('sortBy', sort.field);
    params.set('order', sort.direction);
  }

  const title = filters.find(
    (filter) => filter.field === 'title' && filter.value.trim()
  );
  const query = (search || title?.value || '').trim();
  const category = filters.find(
    (filter) =>
      filter.field === 'category' &&
      filter.condition === 'exact' &&
      filter.value
  );

  let url = `https://dummyjson.com/products?${params}`;
  if (query) {
    params.set('q', query);
    url = `https://dummyjson.com/products/search?${params}`;
  } else if (category) {
    url = `https://dummyjson.com/products/category/${encodeURIComponent(category.value)}?${params}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Products request failed (${response.status})`);
  }
  const body = (await response.json()) as {
    products?: ProductRow[];
    total?: number;
  };
  const data = (body.products ?? []).map((product) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price,
    stock: product.stock,
    rating: product.rating,
  }));
  return { data, totalRows: body.total ?? data.length };
}

const DATASET_SEARCH_URL =
  'https://api.datakeep.civicdays.in/api/search/dataset/';

function appliedFilterValue(filters: FilterField[], field: string) {
  return (
    filters
      .find((filter) => filter.field === field && filter.value.trim())
      ?.value.trim() ?? ''
  );
}

/**
 * CivicDataSpace dataset search.
 * Geography is sent as `geographies` — the documented `Geography` parameter
 * returns no rows. Sector and tag values are comma-separated.
 * A status tab adds `{ field: "format", condition: "exact", value }` and
 * that value is sent as `formats`.
 * The searchable title column adds `{ field: "title", condition: "icontains", value }`
 * and that value is sent as `query`.
 * Title sorts as `alphabetical`; Updated sorts as `recent`.
 */
async function fetchDatasetSearch({
  search,
  filters,
  sorting,
  pagination,
}: {
  search: string;
  filters: FilterField[];
  sorting: SortField[];
  pagination: TablePaginationState;
}): Promise<{
  data: DatasetSearchRow[];
  totalRows: number;
  statusCounts: Record<string, number>;
}> {
  const size = Math.max(pagination.limit, 1);
  const page = Math.floor(pagination.offset / size) + 1;
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  const titleSearch =
    filters.find(
      (filter) => filter.field === 'title' && filter.condition === 'icontains'
    )?.value ?? '';
  const query = (titleSearch || search).trim();
  if (query) params.set('query', query);

  const geography = appliedFilterValue(filters, 'geography');
  const sectors = appliedFilterValue(filters, 'sector');
  const tags = appliedFilterValue(filters, 'tags');
  if (geography) params.set('geographies', geography);
  if (sectors) params.set('sectors', sectors);
  if (tags) params.set('tags', tags);

  const sort = sorting[0];
  const apiSort =
    sort?.field === 'title'
      ? 'alphabetical'
      : sort?.field === 'modified'
        ? 'recent'
        : '';
  if (sort && apiSort) {
    params.set('sort', apiSort);
    params.set('order', sort.direction);
  }

  const format =
    filters.find(
      (filter) => filter.field === 'format' && filter.condition === 'exact'
    )?.value ?? '';
  const rowParams = new URLSearchParams(params);
  if (format) rowParams.set('formats', format);

  const countParams = new URLSearchParams(params);
  countParams.set('page', '1');
  countParams.set('size', '1');

  const [rowsBody, countsBody] = await Promise.all([
    requestDatasetSearch(rowParams),
    format ? requestDatasetSearch(countParams) : Promise.resolve(null),
  ]);
  const countsSource = countsBody ?? rowsBody;

  return {
    data: mapDatasetRows(rowsBody),
    totalRows: rowsBody.total ?? 0,
    statusCounts: formatStatusCounts(countsSource),
  };
}

type DatasetSearchBody = {
  results?: Array<{
    id: string;
    title: string;
    geographies?: string[];
    sectors?: string[];
    formats?: string[];
    tags?: string[];
    modified?: string;
    download_count?: number;
  }>;
  total?: number;
  aggregations?: {
    formats?: Record<string, number>;
  };
};

async function requestDatasetSearch(params: URLSearchParams) {
  const response = await fetch(`${DATASET_SEARCH_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Dataset search failed (${response.status})`);
  }
  return (await response.json()) as DatasetSearchBody;
}

function mapDatasetRows(body: DatasetSearchBody): DatasetSearchRow[] {
  return (body.results ?? []).map((dataset) => ({
    id: dataset.id,
    title: dataset.title,
    geography: joinList(dataset.geographies),
    sector: joinList(dataset.sectors),
    format: joinList(dataset.formats),
    tags: joinList(dataset.tags),
    modified: dataset.modified ?? '',
    downloads: dataset.download_count ?? 0,
  }));
}

function formatStatusCounts(body: DatasetSearchBody) {
  const formats = body.aggregations?.formats ?? {};
  const counts: Record<string, number> = { all: body.total ?? 0 };
  DATASET_FORMATS.forEach((format) => {
    counts[format] = formats[format] ?? 0;
  });
  return counts;
}

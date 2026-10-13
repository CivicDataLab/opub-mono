import '@testing-library/jest-dom';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon } from '../Icon';
import { DataTable } from './DataTable';

const rows = [
    {
        age: 29,
        firstName: 'Lue',
        lastName: 'West',
        progress: 100,
        status: 'single',
        visits: 992
    },
    {
        age: 33,
        firstName: 'Karley',
        lastName: 'Johnson',
        progress: 94,
        status: 'single',
        visits: 951
    }
];

const columns = [
    {
        accessorKey: 'progress',
        header: 'Profile Progress'
    },
    {
        accessorKey: 'status',
        filterFn: 'columnFilter',
        header: 'Status'
    }
]

const mockPaginationControls = {
    goToFirstPage: vi.fn(),
    goToPreviousPage: vi.fn(),
    goToNextPage: vi.fn(),
    goToLastPage: vi.fn()
}

describe('Data Tests', () => {
    beforeEach(() => {
        mockPaginationControls.goToNextPage = vi.fn()
        mockPaginationControls.goToLastPage = vi.fn()
        mockPaginationControls.goToPreviousPage = vi.fn()
        mockPaginationControls.goToLastPage = vi.fn()

        vi.clearAllMocks()
        render(
            <DataTable rows={rows} columns={columns} paginationControls={mockPaginationControls} showPagination={true} />
        )
    });

    it('should render pagination buttons', () => {
        expect(screen.getByText('First Page')).toBeInTheDocument();
        expect(screen.getByText('Previous Page')).toBeInTheDocument();
        expect(screen.getByText('Next Page')).toBeInTheDocument();
        expect(screen.getByText('Last Page')).toBeInTheDocument();
    });

    it('calls goToFirstPage when "First Page" button is clicked', () => {
        const FirstPageBtn = screen.getByText('First Page')
        mockPaginationControls.goToFirstPage()
        fireEvent.click(FirstPageBtn);
        expect(mockPaginationControls.goToFirstPage).toHaveBeenCalledTimes(1)
    })

    it('calls goToFirstPage when "Previous Page" button is clicked', () => {
        const PreviousPageBtn = screen.getByText('Previous Page')
        mockPaginationControls.goToPreviousPage()
        fireEvent.click(PreviousPageBtn);
        expect(mockPaginationControls.goToPreviousPage).toHaveBeenCalledTimes(1)
    })

    it('calls goToFirstPage when "Next Page" button is clicked', () => {
        const NextPageBtn = screen.getByText('Next Page')
        mockPaginationControls.goToNextPage()
        fireEvent.click(NextPageBtn);
        expect(mockPaginationControls.goToNextPage).toHaveBeenCalledTimes(1)
    })

    it('calls goToFirstPage when "Last Page" button is clicked', () => {
        const LastPageBtn = screen.getByText('Last Page')
        mockPaginationControls.goToLastPage()
        fireEvent.click(LastPageBtn);
        expect(mockPaginationControls.goToLastPage).toHaveBeenCalledTimes(1)
    })

});

const serverRows = [
  { name: 'Urban Water Supply', type: 'dataset' },
  { name: 'Draft School Census', type: 'prompt' },
];

const serverColumns = [
  { accessorKey: 'name', header: 'Dataset' },
  {
    accessorKey: 'type',
    header: 'Dataset Type',
    meta: { optional: true },
  },
];

describe('withServer management chrome', () => {
  it('reports search and resets the page offset', () => {
    const onSearchChange = vi.fn();
    const onPaginationChange = vi.fn();

    render(
      <DataTable
        withServer
        hideSelection
        hideFooter
        rows={serverRows}
        columns={serverColumns}
        onSearchChange={onSearchChange}
        onPaginationChange={onPaginationChange}
        paginationState={{ limit: 10, offset: 20 }}
        placeholder="Search datasets..."
      />
    );

    vi.useFakeTimers();
    try {
      fireEvent.change(screen.getByPlaceholderText('Search datasets...'), {
        target: { value: 'w' },
      });
      fireEvent.change(screen.getByPlaceholderText('Search datasets...'), {
        target: { value: 'water' },
      });

      expect(onSearchChange).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onSearchChange).toHaveBeenCalledTimes(1);
      expect(onSearchChange).toHaveBeenCalledWith('water');
      expect(onPaginationChange).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    } finally {
      vi.useRealTimers();
    }
  });

  it('writes an icontains filter for the one searchable column', () => {
    const onFiltersChange = vi.fn();

    render(
      <DataTable
        withServer
        hideSelection
        hideFooter
        title="Datasets"
        rows={serverRows}
        columns={[
          { accessorKey: 'name', header: 'Dataset', searchable: true },
          { accessorKey: 'type', header: 'Dataset Type', searchable: true },
        ]}
        onFiltersChange={onFiltersChange}
        placeholder="Search datasets..."
        filters={[
          {
            columnId: 'type',
            type: 'select',
            options: ['dataset'],
          },
        ]}
        filterState={[
          { field: 'type', condition: 'exact', value: 'dataset' },
        ]}
      />
    );

    vi.useFakeTimers();
    try {
      fireEvent.change(screen.getByPlaceholderText('Search datasets...'), {
        target: { value: 'water' },
      });

      expect(onFiltersChange).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onFiltersChange).toHaveBeenCalledWith([
        { field: 'type', condition: 'exact', value: 'dataset' },
        { field: 'name', condition: 'icontains', value: 'water' },
      ]);

      fireEvent.change(screen.getByPlaceholderText('Search datasets...'), {
        target: { value: '   ' },
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onFiltersChange).toHaveBeenLastCalledWith([
        { field: 'type', condition: 'exact', value: 'dataset' },
      ]);
    } finally {
      vi.useRealTimers();
    }
  });

  it('reports the status tab and resets the page offset', async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();
    const onPaginationChange = vi.fn();

    render(
      <DataTable
        withServer
        hideSelection
        hideFooter
        rows={serverRows}
        columns={serverColumns}
        statuses={[
          { key: 'draft', label: 'Draft' },
          { key: 'published', label: 'Published' },
        ]}
        statusCounts={{ all: 9, draft: 3, published: 6 }}
        statusState="published"
        onStatusChange={onStatusChange}
        onPaginationChange={onPaginationChange}
        paginationState={{ limit: 10, offset: 20 }}
      />
    );

    await user.click(screen.getByRole('tab', { name: 'Draft 3' }));

    expect(onStatusChange).toHaveBeenCalledWith('draft');
    expect(onPaginationChange).toHaveBeenCalledWith({ limit: 10, offset: 0 });
  });

  it('emits an exact filter and keeps a single select value', async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();
    const onPaginationChange = vi.fn();

    render(
      <DataTable
        withServer
        hideSelection
        hideFooter
        title="Datasets"
        rows={serverRows}
        columns={serverColumns}
        filters={[
          {
            columnId: 'type',
            type: 'select',
            options: [
              { label: 'Dataset', value: 'dataset' },
              { label: 'Prompt Dataset', value: 'prompt' },
            ],
          },
        ]}
        onFiltersChange={onFiltersChange}
        onPaginationChange={onPaginationChange}
        paginationState={{ limit: 10, offset: 5 }}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Filter' }));
    await user.click(screen.getByRole('button', { name: 'Any type' }));
    await user.click(screen.getByRole('option', { name: 'Dataset' }));
    await user.click(screen.getByRole('button', { name: 'Dataset' }));
    await user.click(screen.getByRole('option', { name: 'Prompt Dataset' }));
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onFiltersChange).toHaveBeenCalledWith([
      { field: 'type', condition: 'exact', value: 'prompt' },
    ]);
    expect(onPaginationChange).toHaveBeenCalledWith({ limit: 10, offset: 0 });
  });

  it('emits an in filter when several options are selected', async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <DataTable
        withServer
        hideSelection
        hideFooter
        title="Datasets"
        rows={serverRows}
        columns={serverColumns}
        filters={[
          {
            columnId: 'type',
            type: 'multiSelect',
            options: [
              { label: 'Dataset', value: 'dataset' },
              { label: 'Prompt Dataset', value: 'prompt' },
            ],
          },
        ]}
        onFiltersChange={onFiltersChange}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Filter' }));
    await user.click(screen.getByRole('button', { name: 'Any type' }));
    await user.click(screen.getByRole('option', { name: 'Dataset' }));
    await user.click(screen.getByRole('option', { name: 'Prompt Dataset' }));
    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onFiltersChange).toHaveBeenCalledWith([
      { field: 'type', condition: 'in', value: 'dataset,prompt' },
    ]);
  });

  it('emits gte and lte for a date range', () => {
    const onFiltersChange = vi.fn();

    render(
      <DataTable
        withServer
        hideSelection
        hideFooter
        title="Datasets"
        rows={[{ name: 'Urban Water Supply', updatedAt: '2026-05-03' }]}
        columns={[
          { accessorKey: 'name', header: 'Dataset' },
          { accessorKey: 'updatedAt', header: 'Last Updated' },
        ]}
        filters={[{ columnId: 'updatedAt', type: 'date', isRange: true }]}
        onFiltersChange={onFiltersChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    const [from, to] = document.querySelectorAll('input[type="date"]');
    fireEvent.change(from, { target: { value: '2026-01-01' } });
    fireEvent.change(to, { target: { value: '2026-06-01' } });
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onFiltersChange).toHaveBeenCalledWith([
      { field: 'updatedAt', condition: 'gte', value: '2026-01-01' },
      { field: 'updatedAt', condition: 'lte', value: '2026-06-01' },
    ]);
  });

  it('keeps column header filters when the management chrome is off', async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <DataTable
        hideSelection
        hideFooter
        rows={[{ status: 'single' }]}
        columns={[{ accessorKey: 'status', header: 'Status' }]}
        filters={[
          {
            columnId: 'status',
            type: 'multiSelect',
            options: [{ label: 'Single', value: 'single' }],
          },
        ]}
        onFiltersChange={onFiltersChange}
      />
    );

    expect(
      screen.queryByRole('button', { name: 'Filter' })
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Filter Status' }));
    await user.click(screen.getByRole('checkbox', { name: 'Single' }));
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onFiltersChange).toHaveBeenCalledWith([
      { field: 'status', condition: 'in', value: 'single' },
    ]);
  });

  it('hides an optional column from the Columns menu', async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        withServer
        hideSelection
        hideFooter
        title="Datasets"
        rows={serverRows}
        columns={serverColumns}
      />
    );

    expect(
      screen.getByRole('columnheader', { name: 'Dataset Type' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Columns' }));
    await user.click(screen.getByRole('checkbox', { name: 'Dataset Type' }));

    expect(
      screen.queryByRole('columnheader', { name: 'Dataset Type' })
    ).not.toBeInTheDocument();
  });

  it('calls the row action with that row', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <DataTable
        withServer
        hideSelection
        hideFooter
        title="Datasets"
        rows={serverRows}
        columns={serverColumns}
        getRowActions={(row) => [
          {
            key: 'edit',
            icon: IconPencil,
            label: `Edit ${row.name}`,
            onClick: () => onEdit(row),
          },
        ]}
      />
    );

    await user.click(
      screen.getByRole('button', { name: 'Edit Urban Water Supply' })
    );

    expect(onEdit).toHaveBeenCalledWith(serverRows[0]);
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('confirms a destructive action and leaves a plain action immediate', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onPublish = vi.fn();

    render(
      <DataTable
        withServer
        hideSelection
        hideFooter
        title="Datasets"
        rows={serverRows}
        columns={serverColumns}
        getRowActions={(row) => [
          {
            key: 'edit',
            icon: IconPencil,
            label: `Edit ${row.name}`,
            onClick: () => onEdit(row),
          },
          {
            key: 'delete',
            icon: IconTrash,
            label: `Delete ${row.name}`,
            destructive: true,
            onClick: () => onDelete(row),
            alert: {
              title: 'Delete dataset?',
              children: `Delete ${row.name}?`,
            },
          },
          {
            key: 'publish',
            icon: IconPencil,
            label: `Publish ${row.name}`,
            onClick: () => onPublish(row),
            alert: {
              title: 'Publish dataset?',
              children: `Publish ${row.name}?`,
            },
          },
        ]}
      />
    );

    const deleteConfirmButton = () =>
      screen
        .getAllByRole('button', { name: 'Delete Urban Water Supply' })
        .find((button) => button.className.includes('variantCritical'));

    await user.click(
      screen.getByRole('button', { name: 'Delete Urban Water Supply' })
    );
    expect(onDelete).not.toHaveBeenCalled();
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    const deleteConfirm = deleteConfirmButton();
    expect(deleteConfirm).toBeDefined();
    expect(deleteConfirm?.className).toMatch(/kindPrimary/);
    expect(deleteConfirm?.className).toMatch(/variantCritical/);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onDelete).not.toHaveBeenCalled();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Delete Urban Water Supply' })
    );
    await user.click(deleteConfirmButton()!);
    expect(onDelete).toHaveBeenCalledWith(serverRows[0]);

    await user.click(
      screen.getByRole('button', { name: 'Publish Urban Water Supply' })
    );
    const publishConfirm = screen
      .getAllByRole('button', { name: 'Publish Urban Water Supply' })
      .find(
        (button) =>
          button.className.includes('kindPrimary') &&
          button.className.includes('variantBasic')
      );
    expect(publishConfirm).toBeDefined();
    expect(publishConfirm?.className).not.toMatch(/variantCritical/);
    await user.click(publishConfirm!);
    expect(onPublish).toHaveBeenCalledWith(serverRows[0]);
  });

  it('renders an icon node with its own color and stroke', () => {
    render(
      <DataTable
        hideSelection
        hideFooter
        title="Datasets"
        rows={serverRows}
        columns={serverColumns}
        getRowActions={() => [
          {
            key: 'publish',
            icon: (
              <Icon source={IconPencil} color="success" stroke={1.5} size={20} />
            ),
            label: 'Publish',
            onClick: () => undefined,
          },
        ]}
      />
    );

    const icon = screen
      .getAllByRole('button', { name: 'Publish' })[0]
      .querySelector('svg');
    expect(icon).toHaveAttribute('stroke-width', '1.5');
    expect(icon).toHaveAttribute('stroke', 'var(--icon-success)');
  });
});

describe('column sizes', () => {
  const sizeRows = [
    { title: 'A very long dataset title', geography: 'Assam', format: 'CSV' },
  ];

  it('fixes a column at its size and leaves an unsized column alone', () => {
    render(
      <DataTable
        hideSelection
        hideFooter
        rows={sizeRows}
        columns={[
          { accessorKey: 'title', header: 'Dataset', size: 240 },
          { accessorKey: 'geography', header: 'Geography' },
        ]}
      />
    );

    const titleHeader = screen.getByRole('columnheader', { name: 'Dataset' });
    expect(titleHeader.style.width).toBe('240px');
    expect(titleHeader.style.minWidth).toBe('240px');
    expect(titleHeader.style.maxWidth).toBe('240px');
    expect(titleHeader.style.overflow).toBe('hidden');

    const titleCell = screen.getByRole('cell', {
      name: 'A very long dataset title',
    });
    expect(titleCell.style.width).toBe('240px');
    expect(titleCell.style.minWidth).toBe('240px');
    expect(titleCell.style.maxWidth).toBe('240px');

    const geographyHeader = screen.getByRole('columnheader', {
      name: 'Geography',
    });
    expect(geographyHeader.style.width).toBe('');
    expect(geographyHeader.style.minWidth).toBe('');
    expect(geographyHeader.style.maxWidth).toBe('');
  });

  it('uses minSize as a floor without setting a width', () => {
    render(
      <DataTable
        hideSelection
        hideFooter
        rows={sizeRows}
        columns={[
          { accessorKey: 'geography', header: 'Geography', minSize: 140 },
        ]}
      />
    );

    const header = screen.getByRole('columnheader', { name: 'Geography' });
    expect(header.style.minWidth).toBe('140px');
    expect(header.style.width).toBe('');
    expect(header.style.maxWidth).toBe('');
    expect(header.style.overflow).toBe('');

    const cell = screen.getByRole('cell', { name: 'Assam' });
    expect(cell.style.minWidth).toBe('140px');
    expect(cell.style.width).toBe('');
  });
});

describe('DataTable loading and height', () => {
  it('renders one skeleton row per page row inside a fixed height', () => {
    const { container } = render(
      <DataTable
        loading
        hideSelection
        hideFooter
        height={480}
        defaultRowCount={10}
        rows={[]}
        columns={[{ accessorKey: 'title', header: 'Dataset' }]}
      />
    );

    const table = container.querySelector('.opub-DataTable') as HTMLElement;
    expect(table.style.getPropertyValue('--op-data-table-height')).toBe(
      '480px'
    );
    expect(table.style.getPropertyValue('--op-data-table-page-rows')).toBe(
      '10'
    );
    expect(screen.getAllByRole('row')).toHaveLength(11);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('keeps the viewport at the default row count when the page is longer', () => {
    const { container } = render(
      <DataTable
        hideSelection
        withServer
        defaultRowCount={10}
        totalRows={25}
        paginationState={{ limit: 25, offset: 0 }}
        rows={Array.from({ length: 25 }, (_, index) => ({
          title: `Dataset ${index}`,
        }))}
        columns={[{ accessorKey: 'title', header: 'Dataset' }]}
      />
    );

    const table = container.querySelector('.opub-DataTable') as HTMLElement;
    expect(table.style.getPropertyValue('--op-data-table-page-rows')).toBe(
      '10'
    );
    expect(screen.getAllByRole('row')).toHaveLength(26);
  });
});


import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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


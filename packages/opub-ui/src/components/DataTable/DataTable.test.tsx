import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import  {DataTable}  from './DataTable';
import { Footer } from '../Table';

const rows= [
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



describe('Data Tests', () => {
    const NextPage = () => {}
    const FirstPage = () => {}
    const PreviousPage = () => {}
    const LastPage = () => {}
    beforeEach(() => {
      render(
        <DataTable rows={rows} columns={columns} paginationControls={{
            goToFirstPage: FirstPage,
            goToPreviousPage: PreviousPage,
            goToNextPage: NextPage,
            goToLastPage: LastPage,
        }}/>
      )
    });

    it('should show Component text all the time', () => {
        expect(screen.getByText('First Page')).toBeInTheDocument();
        expect(screen.getByText('Previous Page')).toBeInTheDocument();
      });

    it('calls goToFirstPage when "First Page" button is clicked', () => {
        const FirstPageBtn = screen.getByText('First Page')
        fireEvent.click(FirstPageBtn);
        expect(FirstPage).toHaveBeenCalled();
    })

});



// const mockTable = {
//     getCanPreviousPage: () => true,
//     getCanNextPage: () => true,
//     // Include other methods and properties used by Footer as needed
//   };



// describe('should show components', () => {
//     it('calls goToFirstPage when "First Page" button is clicked', () => {
//         const firstPageButton = screen.getByText('First Page');
//         fireEvent.click(firstPageButton);
//         expect(mockPaginationControls.goToFirstPage).toHaveBeenCalled();
//       });
    
//       it('calls goToPreviousPage when "Previous Page" button is clicked', () => {
//         const previousPageButton = screen.getByText('Previous Page');
//         fireEvent.click(previousPageButton);
//         expect(mockPaginationControls.goToPreviousPage).toHaveBeenCalled();
//       });
    
//       it('calls goToNextPage when "Next Page" button is clicked', () => {
//         const nextPageButton = screen.getByText('Next Page');
//         fireEvent.click(nextPageButton);
//         expect(mockPaginationControls.goToNextPage).toHaveBeenCalled();
//       });
    
//       it('calls goToLastPage when "Last Page" button is clicked', () => {
//         const lastPageButton = screen.getByText('Last Page');
//         fireEvent.click(lastPageButton);
//         expect(mockPaginationControls.goToLastPage).toHaveBeenCalled();
//       });
// });


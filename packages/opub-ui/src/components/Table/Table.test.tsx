import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Table } from './Table';

const columns = [
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'age', header: 'Age' },
];

const rows = [
  { firstName: 'Lue', age: 29 },
  { firstName: 'Karley', age: 33 },
];

describe('Table footer pagination', () => {
  it('changing rows-per-page does not error when no handlePageSizeChange is passed', () => {
    // Regression: <Table> renders the shared Footer without a
    // handlePageSizeChange, so the unguarded call threw "handlePageSizeChange
    // is not a function" on every rows-per-page change. React swallows handler
    // errors, so we assert nothing was logged rather than relying on a throw.
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<Table columns={columns} rows={rows} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '25' } });

    const logged = errorSpy.mock.calls.flat().map(String).join('\n');
    errorSpy.mockRestore();
    expect(logged).not.toMatch(/is not a function/i);
  });

  it('forwards the new page size to handlePageSizeChange when provided', () => {
    const handlePageSizeChange = vi.fn();
    render(
      <Table
        columns={columns}
        rows={rows}
        handlePageSizeChange={handlePageSizeChange}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '50' },
    });

    expect(handlePageSizeChange).toHaveBeenCalledWith(50);
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Calendar Tests', () => {
  beforeEach(() => {
    render(<Calendar />);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

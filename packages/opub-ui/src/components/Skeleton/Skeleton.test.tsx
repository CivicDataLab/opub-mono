import '@testing-library/jest-dom';
import { Skeleton } from './Skeleton';
import { render, screen } from '@testing-library/react';

describe('Skeleton Tests', () => {
  beforeEach(() => {
    render(<Skeleton />);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

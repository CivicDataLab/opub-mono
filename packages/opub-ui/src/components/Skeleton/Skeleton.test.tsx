import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Skeleton } from './Skeleton';

describe('Skeleton Tests', () => {
  beforeEach(() => {
    render(<Skeleton />);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

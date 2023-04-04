import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast Tests', () => {
  beforeEach(() => {
    render(<Toast />);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

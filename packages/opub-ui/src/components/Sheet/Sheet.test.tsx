import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Sheet } from './Sheet';

describe('Sheet Tests', () => {
  beforeEach(() => {
    render(<Sheet>Component</Sheet>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

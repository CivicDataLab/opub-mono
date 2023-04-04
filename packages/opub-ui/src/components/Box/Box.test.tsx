import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box Tests', () => {
  beforeEach(() => {
    render(<Box>Component</Box>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

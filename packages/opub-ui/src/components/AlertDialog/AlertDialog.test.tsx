import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Dialog as AlertDialog } from './AlertDialog';

describe('AlertDialog Tests', () => {
  beforeEach(() => {
    render(<AlertDialog>Component</AlertDialog>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

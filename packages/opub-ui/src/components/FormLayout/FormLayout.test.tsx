import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FormLayout } from './FormLayout';

describe('FormLayout Tests', () => {
  beforeEach(() => {
    render(<FormLayout>Component</FormLayout>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

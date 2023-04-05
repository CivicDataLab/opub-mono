import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Code } from './Code';

describe('Code Tests', () => {
  beforeEach(() => {
    render(<Code>Component</Code>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

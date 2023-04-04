import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock Tests', () => {
  beforeEach(() => {
    render(<CodeBlock>Component</CodeBlock>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag Tests', () => {
  beforeEach(() => {
    render(<Tag>Component</Tag>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

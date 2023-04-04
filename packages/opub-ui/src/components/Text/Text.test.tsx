import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text Tests', () => {
  beforeEach(() => {
    render(<Text>Component</Text>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

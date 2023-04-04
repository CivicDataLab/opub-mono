import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ScrollArea } from './ScrollArea';

describe('ScrollArea Tests', () => {
  beforeEach(() => {
    render(<ScrollArea>Component</ScrollArea>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

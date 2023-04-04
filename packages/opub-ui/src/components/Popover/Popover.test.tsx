import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Popover } from './Popover';

describe('Popover Tests', () => {
  beforeEach(() => {
    render(<Popover>Component</Popover>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

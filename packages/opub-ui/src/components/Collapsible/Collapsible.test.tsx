import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Collapsible Tests', () => {
  beforeEach(() => {
    render(<div> Collapsible </div>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

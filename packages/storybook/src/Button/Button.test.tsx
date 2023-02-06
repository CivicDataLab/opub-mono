import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Tests', () => {
  beforeEach(() => {
    render(<Button>Button</Button>);
  });

  test('should show button text all the time', () => {
    expect(screen.getByText(/Button/i)).toBeInTheDocument();
  });

  test('Primary Button should have btn-primary class', () => {
    const btn = screen.getByText(/Button/i);
    expect(btn).toHaveClass('btn-primary');
    fireEvent.click(btn);
  });

  test('Secondary Button has btn-secondary class', () => {
    const { container } = render(
      <Button variant="secondary">Secondary</Button>
    );

    expect(container.firstChild).toHaveClass('btn-secondary');
  });
});

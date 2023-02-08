import { Circle } from '@opub-icons/workflow';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('Button Tests', () => {
  beforeEach(() => {
    render(<IconButton icon={<Circle />}>Button</IconButton>);
  });

  test('should not show button text all the time', () => {
    expect(screen.getByText(/Button/i)).toBeInTheDocument();
  });

  test('Icon Button should have sr-only class', () => {
    const btn = screen.getByText(/Button/i);
    expect(btn).toHaveClass('sr-only');
    fireEvent.click(btn);
  });
});

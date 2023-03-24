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

  test('should show button text on hover', () => {
    fireEvent.mouseOver(screen.getByText(/Button/i));
    expect(screen.getByText(/Button/i)).toBeInTheDocument();
  });

  test('should show button text on focus', () => {
    fireEvent.focus(screen.getByText(/Button/i));
    expect(screen.getByText(/Button/i)).toBeInTheDocument();
  });

  test('should show button text on active', () => {
    fireEvent.mouseDown(screen.getByText(/Button/i));
    expect(screen.getByText(/Button/i)).toBeInTheDocument();
  });

  test('should show button text on disabled', () => {
    render(<Button disabled>Button</Button>);
    fireEvent.mouseDown(screen.getByText(/Button/i));
    expect(screen.getByText(/Button/i)).toBeInTheDocument();
  });
});

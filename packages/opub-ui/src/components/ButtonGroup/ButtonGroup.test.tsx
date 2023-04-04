import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup Tests', () => {
  beforeEach(() => {
    render(<ButtonGroup>Component</ButtonGroup>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

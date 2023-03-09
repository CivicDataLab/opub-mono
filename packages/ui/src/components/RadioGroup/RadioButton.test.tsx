import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';

describe('RadioButton Tests', () => {
  beforeEach(() => {
    render(<RadioButton>Component</RadioButton>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

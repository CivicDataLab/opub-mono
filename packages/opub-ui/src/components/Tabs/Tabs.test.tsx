import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Tabs } from './Tabs';

describe('Tabs Tests', () => {
  beforeEach(() => {
    render(<Tabs>Component</Tabs>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Drawer } from './Drawer';

describe('Drawer Tests', () => {
  beforeEach(() => {
    render(<Drawer>Component</Drawer>);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

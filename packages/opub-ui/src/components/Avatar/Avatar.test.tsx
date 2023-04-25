import '@testing-library/jest-dom';
import { Avatar } from './Avatar';
import { render, screen } from '@testing-library/react';

describe('Avatar Tests', () => {
  beforeEach(() => {
    render(<Avatar size={'medium'} type={'initials'} />);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

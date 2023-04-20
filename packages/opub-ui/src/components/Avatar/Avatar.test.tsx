import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar Tests', () => {
  beforeEach(() => {
    render(<Avatar size={'Medium'} type={'initials'} />);
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

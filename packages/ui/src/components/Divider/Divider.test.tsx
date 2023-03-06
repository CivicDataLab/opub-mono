import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider Tests', () => {
  beforeEach(() => {
    render(<Divider />);
  });

  // test("should show Component text all the time", () => {
  //   expect(screen.getByText(/Component/i)).toBeInTheDocument();
  // });
});

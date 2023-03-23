import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ActionList } from './ActionList';

describe('ActionList Tests', () => {
  beforeEach(() => {
    render(
      <ActionList
        actionRole="menuitem"
        items={[
          { content: 'Create Organisation' },
          { content: 'Create Dataset' },
        ]}
      />
    );
  });

  test('should show action list', () => {
    expect(screen.getByText(/Action List/i)).toBeInTheDocument();
  });
});

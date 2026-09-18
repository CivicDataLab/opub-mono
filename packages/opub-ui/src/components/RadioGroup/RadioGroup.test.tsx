import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { RadioGroup, RadioItem } from './RadioGroup';

describe('RadioGroup', () => {
  test('forwards title on a disabled card item', () => {
    render(
      <RadioGroup name="access-type" variant="card">
        <RadioItem value="open" helpText="Anyone can browse and download">
          Open Access
        </RadioItem>
        <RadioItem
          value="restricted"
          helpText="Requires approval to access"
          disabled
          title="Coming Soon"
        >
          Restricted Access
        </RadioItem>
      </RadioGroup>
    );

    expect(
      screen.getByRole('radio', { name: /restricted access/i })
    ).toHaveAttribute('title', 'Coming Soon');
  });
});

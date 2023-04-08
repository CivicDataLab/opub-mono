import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CheckboxGroup } from './CheckboxGroup';

describe('CheckboxGroup Tests', () => {
  beforeEach(() => {
    render(
      <CheckboxGroup
        title="Terms and Conditions"
        options={[
          {
            label: 'I have read agreement to terms and conditions',
            value: 'terms',
            helpText: 'Reduces the number of fields required to signup.',
          },
          {
            label: 'I would like to receive weekly newsletter',
            value: 'newsletter',
          },
        ]}
        name="1"
      />
    );
  });

  test('should show Component text all the time', () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});

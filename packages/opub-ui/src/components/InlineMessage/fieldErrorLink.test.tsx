import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Combobox } from '../Combobox';
import { Input } from '../Input';
import { Select } from '../Select';

function expectDescribedBy(control: HTMLElement, id: string, message: string) {
  const describedBy = control.getAttribute('aria-describedby') ?? '';
  expect(describedBy.split(' ')).toContain(id);
  expect(document.getElementById(id)).toHaveTextContent(message);
  expect(control).toHaveAttribute('aria-invalid', 'true');
}

describe('field errors are linked to their controls', () => {
  test('Input points aria-describedby at the rendered error and help text', () => {
    render(
      <Input
        id="title"
        label="Title"
        value=""
        error="Title is required"
        helpText="Shown on the dataset page"
        onChange={() => undefined}
      />
    );

    const input = screen.getByRole('textbox', { name: 'Title' });
    expectDescribedBy(input, 'title-error', 'Title is required');
    expect(input.getAttribute('aria-describedby')).toContain('titleHelpText');
    expect(document.getElementById('titleHelpText')).toHaveTextContent(
      'Shown on the dataset page'
    );
  });

  test('Input marks a boolean error invalid without a dangling description', () => {
    render(
      <Input
        id="title"
        label="Title"
        value=""
        error
        onChange={() => undefined}
      />
    );

    const input = screen.getByRole('textbox', { name: 'Title' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(document.getElementById('title-error')).toBeNull();
  });

  test('Select points aria-describedby at the rendered error', () => {
    render(
      <Select
        id="sector"
        label="Sector"
        options={[{ label: 'Health', value: 'health' }]}
        error="Sector is required"
        helpText="Pick the closest match"
      />
    );

    const select = screen.getByRole('combobox', { name: 'Sector' });
    expectDescribedBy(select, 'sector-error', 'Sector is required');
    expect(select.getAttribute('aria-describedby')).toContain('sectorHelpText');
  });

  test('Combobox sets aria-invalid and aria-describedby only when there is an error', () => {
    const { rerender } = render(
      <Combobox
        id="tags"
        label="Tags"
        list={[{ label: 'Health', value: 'health' }]}
        helpText="Used for search"
      />
    );

    const clean = screen.getByRole('combobox', { name: 'Tags' });
    expect(clean).not.toHaveAttribute('aria-invalid');
    expect(clean.getAttribute('aria-describedby')).toBe('tagsHelpText');

    rerender(
      <Combobox
        id="tags"
        label="Tags"
        list={[{ label: 'Health', value: 'health' }]}
        error="Add at least one tag"
        helpText="Used for search"
      />
    );

    const combobox = screen.getByRole('combobox', { name: 'Tags' });
    expectDescribedBy(combobox, 'tags-error', 'Add at least one tag');
    expect(combobox.getAttribute('aria-describedby')).toContain('tagsHelpText');
  });
});

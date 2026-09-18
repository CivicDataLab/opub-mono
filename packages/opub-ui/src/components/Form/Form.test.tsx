import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { DropZone } from './components/DropZone';
import { Input } from './components/Input';
import { Form } from './Form';

describe('Form Tests', () => {
  test('should show Component text all the time', () => {
    render(<Form>Component</Form>);
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });

  test('does not show a static error until the form is submitted', async () => {
    render(
      <Form formOptions={{ defaultValues: { title: '' } }}>
        <Input name="title" required error="This field is required" />
        <button type="submit">Submit</button>
      </Form>
    );

    expect(
      screen.queryByText('This field is required')
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('This field is required')
    ).toBeInTheDocument();
  });

  test('does not show DropZone errorOverlayText until the form is submitted', async () => {
    render(
      <Form formOptions={{ defaultValues: { files: undefined } }}>
        <DropZone
          name="files"
          required
          label="Files"
          errorOverlayText="Add at least one file"
        >
          Upload
        </DropZone>
        <button type="submit">Submit</button>
      </Form>
    );

    expect(
      screen.queryByText('Add at least one file')
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByText('Add at least one file')
    ).toBeInTheDocument();
  });
});

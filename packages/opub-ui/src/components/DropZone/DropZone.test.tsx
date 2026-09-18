import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DropZone } from './DropZone';

describe('DropZone Tests', () => {
  test('should show Component text all the time', () => {
    render(<DropZone>Component</DropZone>);
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });

  test('shows a string error message and critical outline', () => {
    const { container } = render(
      <DropZone error="Add at least one file">Component</DropZone>
    );

    expect(screen.getByText('Add at least one file')).toBeInTheDocument();
    expect(
      container.querySelector('[class*="error"]')
    ).toBeInTheDocument();
  });

  test('boolean error shows outline without a message', () => {
    const { container } = render(
      <DropZone error label="Files">
        Component
      </DropZone>
    );

    expect(screen.queryByText('Add at least one file')).not.toBeInTheDocument();
    expect(
      container.querySelector('[class*="error"]')
    ).toBeInTheDocument();
  });

  test('errorOverlayText still shows a labelled message and outline', () => {
    const { container } = render(
      <DropZone errorOverlayText="Add at least one file">Component</DropZone>
    );

    expect(screen.getByText('Add at least one file')).toBeInTheDocument();
    expect(
      container.querySelector('[class*="error"]')
    ).toBeInTheDocument();
  });
});

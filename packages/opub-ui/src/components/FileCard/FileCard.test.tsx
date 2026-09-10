import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';

import { Tooltip } from '../Tooltip';
import { FileCard } from './FileCard';

const file = {
  name: 'Climate Risk Indicators 2025',
  format: 'CSV',
  size: '2.0MB',
  uploadedAt: '10/08/2026 17:30:00',
  originalName: 'climate_risk_indicators_2025.csv',
};

function renderFileCard(props: Partial<ComponentProps<typeof FileCard>> = {}) {
  return render(
    <Tooltip.Provider>
      <FileCard {...file} {...props} />
    </Tooltip.Provider>
  );
}

describe('FileCard', () => {
  test('renders the name, type, and metadata', () => {
    renderFileCard();

    expect(screen.getByText(file.name)).toBeInTheDocument();
    expect(screen.getByText('CSV')).toBeInTheDocument();
    expect(
      screen.getByText(/Size: 2.0MB/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Original: climate_risk_indicators_2025.csv/)
    ).toBeInTheDocument();
    expect(screen.getByText('Ready')).toBeInTheDocument();
  });

  test('hides action controls when callbacks are omitted', () => {
    renderFileCard();

    expect(
      screen.queryByRole('button', { name: 'Rename' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'View' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Delete' })
    ).not.toBeInTheDocument();
  });

  test('calls onView and onDelete', () => {
    const onView = vi.fn();
    const onDelete = vi.fn();
    renderFileCard({ onView, onDelete });

    fireEvent.click(screen.getByRole('button', { name: 'View' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onView).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  test('commits a renamed value on Enter', () => {
    const onRename = vi.fn();
    renderFileCard({ onRename });

    fireEvent.click(screen.getByRole('button', { name: 'Rename' }));
    const input = screen.getByRole('textbox', { name: 'File name' });
    fireEvent.change(input, { target: { value: 'Updated indicators' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onRename).toHaveBeenCalledWith('Updated indicators');
  });

  test('does not rename when editing is cancelled', () => {
    const onRename = vi.fn();
    renderFileCard({ onRename });

    fireEvent.click(screen.getByRole('button', { name: 'Rename' }));
    const input = screen.getByRole('textbox', { name: 'File name' });
    fireEvent.change(input, { target: { value: 'Should not save' } });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(onRename).not.toHaveBeenCalled();
    expect(screen.getByText(file.name)).toBeInTheDocument();
  });

  test('shows processing and error status labels', () => {
    const { rerender } = renderFileCard({ status: 'processing' });
    expect(screen.getByText('Processing')).toBeInTheDocument();

    rerender(
      <Tooltip.Provider>
        <FileCard {...file} status="error" statusLabel="Failed" />
      </Tooltip.Provider>
    );
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });
});

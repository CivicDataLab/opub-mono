import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { SectionCard } from './SectionCard';

describe('SectionCard', () => {
  test('renders the title, description, and body', () => {
    render(
      <SectionCard title="Contact details" description="How we reach you">
        Form fields
      </SectionCard>
    );

    expect(screen.getByText('Contact details')).toBeInTheDocument();
    expect(screen.getByText('How we reach you')).toBeInTheDocument();
    expect(screen.getByText('Form fields')).toBeVisible();
  });

  test('renders header actions to the right of the title', () => {
    const onEdit = vi.fn();
    render(
      <SectionCard
        title="Contact details"
        actions={[{ content: 'Edit', onAction: onEdit }]}
      >
        Form fields
      </SectionCard>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  test('renders an icon-only header action when an icon is provided', () => {
    const onEdit = vi.fn();
    function PencilIcon() {
      return <svg data-testid="pencil-icon" />;
    }

    render(
      <SectionCard
        title="Contact details"
        actions={[{ content: 'Edit', icon: PencilIcon, onAction: onEdit }]}
      >
        Form fields
      </SectionCard>
    );

    const action = screen.getByRole('button', { name: 'Edit' });
    fireEvent.click(action);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('pencil-icon')).toBeInTheDocument();
  });

  test('renders the footer', () => {
    render(
      <SectionCard title="Contact details" footer={<button>Save</button>}>
        Form fields
      </SectionCard>
    );

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  test('hides the chevron when the card is not expandable', () => {
    render(<SectionCard title="Contact details">Form fields</SectionCard>);

    expect(
      screen.queryByRole('button', { name: /collapse section|expand section/i })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Form fields')).toBeVisible();
  });

  test('starts expanded by default when expandable', () => {
    render(
      <SectionCard title="Contact details" expandable>
        Form fields
      </SectionCard>
    );

    expect(screen.getByText('Form fields')).toBeVisible();
    expect(
      screen.getByRole('button', { name: /collapse section/i })
    ).toBeInTheDocument();
  });

  test('hides the body when expandable and collapsed', () => {
    render(
      <SectionCard title="Contact details" expandable defaultExpanded={false}>
        Form fields
      </SectionCard>
    );

    expect(screen.getByText('Form fields')).not.toBeVisible();
    expect(
      screen.getByRole('button', { name: /expand section/i })
    ).toBeInTheDocument();
  });

  test('toggles the body from the title', () => {
    render(
      <SectionCard title="Contact details" expandable>
        Form fields
      </SectionCard>
    );

    fireEvent.click(screen.getByRole('button', { name: /collapse section/i }));
    expect(screen.getByText('Form fields')).not.toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: /expand section/i }));
    expect(screen.getByText('Form fields')).toBeVisible();
  });

  test('places the expand control immediately before the title', () => {
    render(
      <SectionCard title="Contact details" expandable>
        Form fields
      </SectionCard>
    );

    const title = screen.getByRole('heading', { name: /contact details/i });
    const trigger = screen.getByRole('button', { name: /collapse section/i });

    expect(title).toContainElement(trigger);
    expect(trigger).toHaveTextContent('Contact details');
  });

  test('does not toggle when a header action is clicked', () => {
    const onEdit = vi.fn();
    render(
      <SectionCard
        title="Contact details"
        expandable
        actions={[{ content: 'Edit', onAction: onEdit }]}
      >
        Form fields
      </SectionCard>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Form fields')).toBeVisible();
    expect(
      screen.getByRole('button', { name: /collapse section/i })
    ).toBeInTheDocument();
  });

  test('notifies when the expanded state changes', () => {
    const onExpandedChange = vi.fn();
    render(
      <SectionCard
        title="Contact details"
        expandable
        onExpandedChange={onExpandedChange}
      >
        Form fields
      </SectionCard>
    );

    fireEvent.click(screen.getByRole('button', { name: /collapse section/i }));
    expect(onExpandedChange).toHaveBeenCalledWith(false);
  });

  test('respects a controlled expanded state', () => {
    const onExpandedChange = vi.fn();
    const { rerender } = render(
      <SectionCard
        title="Contact details"
        expandable
        expanded
        onExpandedChange={onExpandedChange}
      >
        Form fields
      </SectionCard>
    );

    expect(screen.getByText('Form fields')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: /collapse section/i }));
    expect(onExpandedChange).toHaveBeenCalledWith(false);
    expect(screen.getByText('Form fields')).toBeVisible();

    rerender(
      <SectionCard
        title="Contact details"
        expandable
        expanded={false}
        onExpandedChange={onExpandedChange}
      >
        Form fields
      </SectionCard>
    );

    expect(screen.getByText('Form fields')).not.toBeVisible();
  });

  test('preserves form field state while collapsed', () => {
    render(
      <SectionCard title="Contact details" expandable>
        <label>
          Name
          <input aria-label="Name" defaultValue="" />
        </label>
      </SectionCard>
    );

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'Priya' },
    });
    fireEvent.click(screen.getByRole('button', { name: /collapse section/i }));
    fireEvent.click(screen.getByRole('button', { name: /expand section/i }));

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('Priya');
  });
});

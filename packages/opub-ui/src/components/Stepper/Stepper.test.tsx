import '@testing-library/jest-dom';
import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Stepper, StepperItem, StepperProps, useStepperStep } from './Stepper';

const steps: StepperItem[] = [
  { step: 1, label: 'Details', content: 'Details form' },
  { step: 2, label: 'Settings', content: 'Settings form' },
  { step: 3, label: 'Review', content: 'Review form' },
];

function ControlledStepper({
  initialStep = 2,
  onStepClick,
  ...props
}: Partial<StepperProps> & { initialStep?: number }) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  return (
    <Stepper
      steps={steps}
      {...props}
      currentStep={currentStep}
      onStepClick={(step) => {
        setCurrentStep(step);
        onStepClick?.(step);
      }}
    />
  );
}

describe('Stepper', () => {
  test('renders each step label', () => {
    render(<Stepper steps={steps} currentStep={2} />);

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
  });

  test('renders descriptions in the default layout', () => {
    const described: StepperItem[] = [
      { ...steps[0], description: 'Basic information' },
      { ...steps[1], description: 'Preferences' },
      steps[2],
    ];
    render(<Stepper steps={described} currentStep={2} />);

    expect(screen.getByText('Basic information')).toBeInTheDocument();
    expect(screen.getByText('Preferences')).toBeInTheDocument();
  });

  test('hides descriptions in the compact layout', () => {
    const described: StepperItem[] = [
      { ...steps[0], description: 'Basic information' },
      steps[1],
      steps[2],
    ];
    render(<Stepper steps={described} currentStep={2} compact />);

    expect(screen.queryByText('Basic information')).not.toBeInTheDocument();
  });

  test('marks the current step', () => {
    render(<Stepper steps={steps} currentStep={2} />);

    expect(screen.getByText('Settings').closest('li')).toHaveAttribute(
      'aria-current',
      'step'
    );
  });

  test('shows the active step content and hides other step content', () => {
    const stepsWithFirstComplete: StepperItem[] = [
      { ...steps[0], isCompleted: true },
      steps[1],
      steps[2],
    ];
    render(<Stepper steps={stepsWithFirstComplete} currentStep={2} />);

    expect(screen.getByText('Settings form')).toBeVisible();
    expect(screen.getByText('Details form')).not.toBeVisible();
    expect(screen.getByText('Review form')).not.toBeVisible();
  });

  test('does not infer completion from currentStep alone', () => {
    render(<Stepper steps={steps} currentStep={3} />);

    expect(screen.getAllByText('Incomplete')).toHaveLength(2);
    expect(screen.queryByText('Completed')).not.toBeInTheDocument();
  });

  test('marks skipped previous steps as incomplete', () => {
    const mixed: StepperItem[] = [
      steps[0],
      { ...steps[1], isCompleted: true },
      steps[2],
    ];
    render(<Stepper steps={mixed} currentStep={3} />);

    expect(screen.getByText('Details').closest('li')).toHaveTextContent(
      'Incomplete'
    );
    expect(screen.getByText('Settings').closest('li')).toHaveTextContent(
      'Completed'
    );
    expect(screen.getByText('Details form')).not.toBeVisible();
    expect(screen.getByText('Review form')).toBeVisible();
  });

  test('keeps a later completed step looking disabled until it is visited', () => {
    const laterComplete: StepperItem[] = [
      steps[0],
      steps[1],
      { ...steps[2], isCompleted: true },
    ];
    render(<Stepper steps={laterComplete} defaultStep={1} />);

    expect(screen.getByText('Review').closest('li')).not.toHaveTextContent(
      'Completed'
    );
    expect(screen.queryByText('Completed')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Review/i }));

    expect(screen.getByText('Review').closest('li')).toHaveTextContent(
      'Completed'
    );
    expect(screen.getByText('Review form')).toBeInTheDocument();
  });

  test('calls onStepClick when a step is selected', () => {
    const onStepClick = vi.fn();
    render(
      <Stepper steps={steps} currentStep={2} onStepClick={onStepClick} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Review/i }));
    expect(onStepClick).toHaveBeenCalledWith(3);
  });

  test('does not change the active step when controlled and onStepClick is ignored', () => {
    render(
      <Stepper steps={steps} currentStep={2} onStepClick={() => {}} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Settings form')).toBeVisible();
    expect(screen.getByText('Review form')).not.toBeVisible();
  });

  test('shows Previous and Continue by default', () => {
    render(<Stepper steps={steps} currentStep={2} />);

    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Continue' })
    ).toBeInTheDocument();
  });

  test('uses custom navigation labels', () => {
    render(
      <Stepper
        steps={steps}
        currentStep={2}
        previousLabel="Back"
        nextLabel="Next"
      />
    );

    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  test('hides Previous and Continue when navigation is false', () => {
    render(<Stepper steps={steps} currentStep={2} navigation={false} />);

    expect(
      screen.queryByRole('button', { name: 'Previous' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Continue' })
    ).not.toBeInTheDocument();
  });

  test('calls onStepClick from Previous and Continue', () => {
    const onStepClick = vi.fn();
    render(<ControlledStepper onStepClick={onStepClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(onStepClick).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onStepClick).toHaveBeenCalledWith(2);
  });

  test('Previous and Continue change the active step when uncontrolled', () => {
    render(<Stepper steps={steps} defaultStep={2} />);

    expect(screen.getByText('Settings form')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Review form')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByText('Settings form')).toBeVisible();
  });

  test('disables Previous on the first step and Continue on the last step', () => {
    const { rerender } = render(
      <Stepper steps={steps} currentStep={1} onStepClick={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    expect(
      screen.getByRole('button', { name: 'Continue' })
    ).not.toHaveAttribute('aria-disabled', 'true');

    rerender(
      <Stepper steps={steps} currentStep={3} onStepClick={vi.fn()} />
    );

    expect(
      screen.getByRole('button', { name: 'Previous' })
    ).not.toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  test('restrictNavigation keeps Continue enabled and marks the current step critical', () => {
    const incomplete: StepperItem[] = [
      { ...steps[0], isCompleted: false },
      steps[1],
      steps[2],
    ];
    const { rerender } = render(
      <Stepper steps={incomplete} defaultStep={1} restrictNavigation />
    );

    expect(
      screen.getByRole('button', { name: 'Continue' })
    ).not.toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Details form')).toBeVisible();
    expect(screen.getByText('Details').closest('li')).toHaveTextContent(
      'Incomplete'
    );

    rerender(
      <Stepper
        steps={[{ ...steps[0], isCompleted: true }, steps[1], steps[2]]}
        defaultStep={1}
        restrictNavigation
      />
    );

    expect(screen.queryByText('Incomplete')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Settings form')).toBeVisible();
  });

  test('restrictNavigation blocks later markers and marks the current step critical', () => {
    const onStepClick = vi.fn();
    render(
      <Stepper
        steps={steps}
        currentStep={1}
        restrictNavigation
        onStepClick={onStepClick}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Settings/i }));
    expect(onStepClick).not.toHaveBeenCalled();
    expect(screen.getByText('Details form')).toBeVisible();
    expect(screen.getByText('Details').closest('li')).toHaveTextContent(
      'Incomplete'
    );
  });

  test('restrictNavigation still allows going back', () => {
    render(
      <Stepper
        steps={[
          { ...steps[0], isCompleted: true },
          { ...steps[1], isCompleted: false },
          steps[2],
        ]}
        defaultStep={2}
        restrictNavigation
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByText('Details form')).toBeVisible();
  });

  test('useStepperStep exposes showErrors after a blocked forward move', () => {
    function Probe() {
      const { showErrors } = useStepperStep();
      return <span>{showErrors ? 'Field errors visible' : 'Fields clean'}</span>;
    }

    const { rerender } = render(
      <Stepper
        steps={[
          { step: 1, label: 'Details', content: <Probe /> },
          { step: 2, label: 'Settings', content: 'Settings form' },
        ]}
        defaultStep={1}
        restrictNavigation
      />
    );

    expect(screen.getByText('Fields clean')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Field errors visible')).toBeInTheDocument();

    rerender(
      <Stepper
        steps={[
          { step: 1, label: 'Details', isCompleted: true, content: <Probe /> },
          { step: 2, label: 'Settings', content: 'Settings form' },
        ]}
        defaultStep={1}
        restrictNavigation
      />
    );

    expect(screen.getByText('Fields clean')).toBeInTheDocument();
  });
});

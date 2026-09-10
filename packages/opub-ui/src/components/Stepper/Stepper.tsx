import React, {
  createContext,
  forwardRef,
  useContext,
  useState,
} from 'react';
import {
  IconAlertCircle,
  IconCheck,
  TablerIconsProps,
} from '@tabler/icons-react';

import { cn } from '../../utils';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';
import styles from './Stepper.module.scss';

export interface StepperItem {
  /** 1-based step number used to compare against `currentStep` */
  step: number;
  /** Short title shown next to or below the indicator */
  label: string;
  /** Supporting copy shown below the label in the default layout */
  description?: string;
  /** Body of this step, shown below the markers when it is current */
  content?: React.ReactNode;
  /** Whether this step is complete. Set from the step content via `onCompletedChange`. */
  isCompleted?: boolean;
  /** Optional Tabler icon shown in the default layout when the step is not complete */
  icon?: React.ComponentType<TablerIconsProps>;
}

export interface StepperProps {
  /** Ordered list of steps to render */
  steps: StepperItem[];
  /** Active step number. When set, the stepper is controlled */
  currentStep?: number;
  /** Initial step when uncontrolled. Defaults to the first item in `steps` */
  defaultStep?: number;
  /** Horizontal layout with smaller indicators and labels beside the marker */
  compact?: boolean;
  /** Called when a step is selected via a marker, Previous, or Continue */
  onStepClick?: (step: number) => void;
  /**
   * Show Previous and Continue buttons below the step body
   * @default true
   */
  navigation?: boolean;
  /**
   * When true, a forward move is ignored until the current step is completed.
   * Continue stays enabled; the current step turns critical instead.
   * @default false
   */
  restrictNavigation?: boolean;
  /** Label for the previous-step button */
  previousLabel?: string;
  /** Label for the next-step button */
  nextLabel?: string;
  /** Accessible name for the progress navigation */
  accessibilityLabel?: string;
  className?: string;
}

export interface StepperStepContextValue {
  /** Active step number */
  step: number;
  /** True after a blocked forward move while this step is still incomplete */
  showErrors: boolean;
}

const StepperStepContext = createContext<StepperStepContextValue | null>(null);

/**
 * Read whether the current step should show field errors.
 * Use inside step `content` after a failed Next / later-marker click.
 */
export function useStepperStep() {
  const context = useContext(StepperStepContext);
  if (!context) {
    throw new Error('useStepperStep must be used within Stepper content');
  }
  return context;
}

type StepStatus = 'completed' | 'current' | 'incomplete' | 'upcoming';

function getStepStatus(
  step: number,
  activeStep: number,
  isCompleted?: boolean,
  attempted?: boolean
): StepStatus {
  if (step > activeStep) return 'upcoming';
  if (step === activeStep && !isCompleted && attempted) {
    return 'incomplete';
  }
  if (isCompleted) return 'completed';
  if (step === activeStep) return 'current';
  return 'incomplete';
}

function labelColor(status: StepStatus) {
  if (status === 'incomplete') return 'critical' as const;
  if (status === 'upcoming') return 'disabled' as const;
  return 'highlight' as const;
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      currentStep,
      defaultStep,
      compact = false,
      onStepClick,
      navigation = true,
      restrictNavigation = false,
      previousLabel = 'Previous',
      nextLabel = 'Continue',
      accessibilityLabel = 'Progress',
      className,
    },
    ref
  ) => {
    const isControlled = currentStep !== undefined;
    const [uncontrolledStep, setUncontrolledStep] = useState(
      () => defaultStep ?? steps[0]?.step ?? 1
    );
    const [attemptedSteps, setAttemptedSteps] = useState<number[]>([]);
    const activeStep = isControlled ? currentStep : uncontrolledStep;

    const currentIndex = steps.findIndex((item) => item.step === activeStep);
    const previousStep =
      currentIndex > 0 ? steps[currentIndex - 1].step : undefined;
    const nextStep =
      currentIndex >= 0 && currentIndex < steps.length - 1
        ? steps[currentIndex + 1].step
        : undefined;
    const attemptedCurrent = attemptedSteps.includes(activeStep);
    const hasContent = steps.some((item) => item.content);

    function canGoTo(step: number) {
      if (!restrictNavigation) return true;

      const targetIndex = steps.findIndex((item) => item.step === step);
      if (targetIndex < 0 || currentIndex < 0) return false;
      if (targetIndex <= currentIndex) return true;

      for (let index = currentIndex; index < targetIndex; index++) {
        if (!steps[index]?.isCompleted) return false;
      }

      return true;
    }

    function goTo(step: number) {
      if (!canGoTo(step)) {
        setAttemptedSteps((prev) =>
          prev.includes(activeStep) ? prev : [...prev, activeStep]
        );
        return;
      }
      if (!isControlled) {
        setUncontrolledStep(step);
      }
      onStepClick?.(step);
    }

    return (
      <div ref={ref} className={cn('opub-Stepper', className)}>
        <nav aria-label={accessibilityLabel}>
          <ol className={cn(styles.Root, compact && styles.isCompact)}>
            {steps.map((item, index) => {
              const status = getStepStatus(
                item.step,
                activeStep,
                item.isCompleted,
                attemptedCurrent
              );
              const isCurrent = item.step === activeStep;
              const isLast = index === steps.length - 1;
              const StepIcon = item.icon;
              const iconSize = compact ? 14 : 20;

              const indicator = (
                <div
                  className={cn(
                    styles.Indicator,
                    status === 'upcoming' && styles.upcoming,
                    (status === 'completed' || status === 'current') &&
                      styles.active,
                    status === 'incomplete' && styles.incomplete
                  )}
                >
                  {status === 'completed' ? (
                    <Icon
                      source={IconCheck}
                      size={iconSize}
                      color="onBgDefault"
                    />
                  ) : status === 'incomplete' ? (
                    <Icon
                      source={IconAlertCircle}
                      size={iconSize}
                      color="onBgDefault"
                    />
                  ) : StepIcon && !compact ? (
                    <Icon
                      source={StepIcon}
                      size={20}
                      color={status === 'current' ? 'onBgDefault' : 'disabled'}
                    />
                  ) : compact ? (
                    item.step
                  ) : (
                    String(item.step).padStart(2, '0')
                  )}
                </div>
              );

              const markerContent = (
                <div className={styles.Content}>
                  <Text
                    as="p"
                    variant={compact ? 'bodySm' : 'bodyMd'}
                    fontWeight={compact ? 'medium' : 'semibold'}
                    color={labelColor(status)}
                    className={styles.Label}
                  >
                    {item.label}
                  </Text>
                  {!compact && item.description ? (
                    <Text
                      as="p"
                      variant="bodySm"
                      color={
                        status === 'incomplete'
                          ? 'critical'
                          : status === 'upcoming'
                            ? 'disabled'
                            : 'subdued'
                      }
                      className={styles.Description}
                    >
                      {item.description}
                    </Text>
                  ) : null}
                  {status === 'completed' && (
                    <Text as="span" visuallyHidden>
                      Completed
                    </Text>
                  )}
                  {status === 'incomplete' && (
                    <Text as="span" visuallyHidden>
                      Incomplete
                    </Text>
                  )}
                </div>
              );

              const stepClassName = cn(styles.Step, styles.StepButton);

              return (
                <li
                  key={item.step}
                  className={cn(styles.Item, !isLast && styles.grow)}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {navigation || onStepClick ? (
                    <button
                      type="button"
                      className={stepClassName}
                      onClick={() => goTo(item.step)}
                    >
                      {indicator}
                      {markerContent}
                    </button>
                  ) : (
                    <div className={styles.Step}>
                      {indicator}
                      {markerContent}
                    </div>
                  )}
                  {!isLast && (
                    <div
                      className={cn(
                        styles.Connector,
                        status === 'completed' && styles.completed,
                        status === 'incomplete' && styles.incomplete
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        {hasContent ? (
          <div className={styles.Body}>
            {steps.map((item) =>
              item.content ? (
                <StepperStepContext.Provider
                  key={item.step}
                  value={{
                    step: item.step,
                    showErrors:
                      attemptedSteps.includes(item.step) && !item.isCompleted,
                  }}
                >
                  <div hidden={item.step !== activeStep}>{item.content}</div>
                </StepperStepContext.Provider>
              ) : null
            )}
          </div>
        ) : null}
        {navigation && (
          <div className={styles.Actions}>
            <Button
              kind="secondary"
              className={styles.buttonPrevious}
              disabled={previousStep === undefined}
              onClick={() => {
                if (previousStep !== undefined) goTo(previousStep);
              }}
            >
              {previousLabel}
            </Button>
            <Button
              disabled={nextStep === undefined}
              className={styles.buttonNext}
              onClick={() => {
                if (nextStep !== undefined) goTo(nextStep);
              }}
            >
              {nextLabel}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';

export { Stepper };

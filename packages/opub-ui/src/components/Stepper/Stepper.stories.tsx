import { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCircleCheck,
  IconEye,
  IconFileText,
  IconSettings,
} from '@tabler/icons-react';

import { Checkbox } from '../Checkbox';
import { FormLayout } from '../FormLayout';
import { Text } from '../Text';
import { TextField } from '../TextField';
import { Stepper, StepperItem, useStepperStep } from './Stepper';

const defaultSteps: StepperItem[] = [
  {
    step: 1,
    label: 'Details',
    description: 'Basic information',
    content: (
      <Text as="p" variant="bodyMd">
        Enter the basic information for this record.
      </Text>
    ),
  },
  {
    step: 2,
    label: 'Settings',
    description: 'Preferences and defaults',
    content: (
      <Text as="p" variant="bodyMd">
        Configure preferences and defaults.
      </Text>
    ),
  },
  {
    step: 3,
    label: 'Review',
    description: 'Confirm your choices',
    content: (
      <Text as="p" variant="bodyMd">
        Confirm your choices before submitting.
      </Text>
    ),
  },
  {
    step: 4,
    label: 'Complete',
    description: 'Finish and submit',
    content: (
      <Text as="p" variant="bodyMd">
        Finish and submit the form.
      </Text>
    ),
  },
];

const iconSteps: StepperItem[] = [
  {
    ...defaultSteps[0],
    icon: IconFileText,
    isCompleted: true,
  },
  {
    ...defaultSteps[1],
    icon: IconSettings,
  },
  {
    ...defaultSteps[2],
    icon: IconEye,
  },
  {
    ...defaultSteps[3],
    icon: IconCircleCheck,
  },
];

/**
 * A progress indicator for multi-step flows such as wizards and onboarding.
 * Pass `defaultStep` and the stepper keeps the active step.
 * Pass `currentStep` and `onStepClick` only when the parent needs to own it.
 */
const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  args: {
    steps: [
      { ...defaultSteps[0], isCompleted: true },
      defaultSteps[1],
      defaultSteps[2],
      defaultSteps[3],
    ],
    defaultStep: 2,
    compact: false,
    navigation: true,
    restrictNavigation: false,
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const WithIcons: Story = {
  args: {
    steps: iconSteps,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(args.defaultStep ?? 1);

    return (
      <Stepper
        {...args}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />
    );
  },
};

export const FormWizard: Story = {
  render: () => {
    const [detailsCompleted, setDetailsCompleted] = useState(false);
    const [settingsCompleted, setSettingsCompleted] = useState(false);
    const [reviewCompleted, setReviewCompleted] = useState(false);
    const [doneCompleted, setDoneCompleted] = useState(false);

    const steps: StepperItem[] = [
      {
        step: 1,
        label: 'Details',
        description: 'Name and email',
        icon: IconFileText,
        isCompleted: detailsCompleted,
        content: <DetailsFields onCompletedChange={setDetailsCompleted} />,
      },
      {
        step: 2,
        label: 'Settings',
        description: 'Organization details',
        icon: IconSettings,
        isCompleted: settingsCompleted,
        content: <SettingsFields onCompletedChange={setSettingsCompleted} />,
      },
      {
        step: 3,
        label: 'Review',
        description: 'Confirm details',
        icon: IconEye,
        isCompleted: reviewCompleted,
        content: <ReviewFields onCompletedChange={setReviewCompleted} />,
      },
      {
        step: 4,
        label: 'Done',
        description: 'All steps submitted',
        icon: IconCircleCheck,
        isCompleted: doneCompleted,
        content: <DoneMessage onCompletedChange={setDoneCompleted} />,
      },
    ];

    return (
      <Stepper steps={steps} defaultStep={1} restrictNavigation />
    );
  },
};

function useReportCompletion(
  valid: boolean,
  onCompletedChange: (isCompleted: boolean) => void
) {
  useEffect(() => {
    onCompletedChange(valid);
  }, [valid, onCompletedChange]);
}

function DetailsFields({
  onCompletedChange,
}: {
  onCompletedChange: (isCompleted: boolean) => void;
}) {
  const { showErrors } = useStepperStep();
  const [values, setValues] = useState({ name: '', email: '' });
  const valid = values.name.trim().length > 0 && values.email.trim().length > 0;

  useReportCompletion(valid, onCompletedChange);

  return (
    <FormLayout>
      <TextField
        name="name"
        label="Name"
        required
        requiredIndicator
        value={values.name}
        error={
          showErrors && !values.name.trim() ? 'Name is required' : undefined
        }
        onChange={(value) => setValues((prev) => ({ ...prev, name: value }))}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        required
        requiredIndicator
        value={values.email}
        error={
          showErrors && !values.email.trim() ? 'Email is required' : undefined
        }
        onChange={(value) => setValues((prev) => ({ ...prev, email: value }))}
      />
    </FormLayout>
  );
}

function SettingsFields({
  onCompletedChange,
}: {
  onCompletedChange: (isCompleted: boolean) => void;
}) {
  const { showErrors } = useStepperStep();
  const [values, setValues] = useState({ organization: '', role: '' });
  const valid = values.organization.trim().length > 0;

  useReportCompletion(valid, onCompletedChange);

  return (
    <FormLayout>
      <TextField
        name="organization"
        label="Organization"
        required
        requiredIndicator
        value={values.organization}
        error={
          showErrors && !values.organization.trim()
            ? 'Organization is required'
            : undefined
        }
        onChange={(value) =>
          setValues((prev) => ({ ...prev, organization: value }))
        }
      />
      <TextField
        name="role"
        label="Role"
        value={values.role}
        onChange={(value) => setValues((prev) => ({ ...prev, role: value }))}
      />
    </FormLayout>
  );
}

function ReviewFields({
  onCompletedChange,
}: {
  onCompletedChange: (isCompleted: boolean) => void;
}) {
  const { showErrors } = useStepperStep();
  const [accepted, setAccepted] = useState(false);

  useReportCompletion(accepted, onCompletedChange);

  return (
    <FormLayout>
      <Text as="p" variant="bodyMd">
        Go back to edit any previous step, then confirm these details are
        correct.
      </Text>
      <Checkbox
        name="accepted"
        checked={accepted}
        error={showErrors ? 'Confirm the details to continue' : undefined}
        onChange={(selected) => setAccepted(selected === true)}
      >
        I confirm these details are correct
      </Checkbox>
    </FormLayout>
  );
}

function DoneMessage({
  onCompletedChange,
}: {
  onCompletedChange: (isCompleted: boolean) => void;
}) {
  useEffect(() => {
    onCompletedChange(true);
  }, [onCompletedChange]);

  return (
    <Text as="p" variant="bodyMd">
      All steps are submitted. You can go back to edit any form.
    </Text>
  );
}

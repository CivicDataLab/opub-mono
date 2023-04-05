import { Meta } from '@storybook/react';
import { RadioGroup, RadioItem } from './RadioGroup';

/**
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/radio-group
 */
const meta = {
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const Default = () => (
  <RadioGroup name="radio1" defaultValue="12">
    <RadioItem value="12">Radio 1</RadioItem>
    <RadioItem value="23">Radio 2</RadioItem>
  </RadioGroup>
);

export const HelpText = () => (
  <RadioGroup name="radio1">
    <RadioItem value="12" helpText="This is a help text">
      Radio 1
    </RadioItem>
    <RadioItem value="23" helpText="This is a help text">
      Radio 2
    </RadioItem>
  </RadioGroup>
);

export const Disabled = () => (
  <RadioGroup name="radio1">
    <RadioItem value="12">Radio 1</RadioItem>
    <RadioItem value="23" disabled>
      Radio 2
    </RadioItem>
    <RadioItem value="11">Radio 3</RadioItem>
  </RadioGroup>
);

export const Error = () => (
  <RadioGroup name="radio1" error="oops">
    <RadioItem value="12">Radio 1</RadioItem>
    <RadioItem value="23" helpText="This is a help text">
      Radio 2
    </RadioItem>
  </RadioGroup>
);

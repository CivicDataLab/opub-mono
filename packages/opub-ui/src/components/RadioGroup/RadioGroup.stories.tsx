import { Meta } from '@storybook/react-vite';

import { RadioGroup, RadioItem } from './RadioGroup';

/**
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/radio-group
 */
const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const Default = () => (
  <RadioGroup
    onChange={(val, name) => {
      console.log(val, name);
    }}
    name="radio1"
    defaultValue="12"
    title="Select an item"
  >
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
      Radio 2 (disabled)
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

export const Cards = () => (
  <RadioGroup
    name="access-type"
    title="Access type"
    requiredIndicator
    variant="card"
    defaultValue="open"
    onChange={(val, name) => {
      console.log(val, name);
    }}
  >
    <RadioItem value="open" helpText="Anyone can browse and download">
      Open Access
    </RadioItem>
    <RadioItem value="restricted" helpText="Requires approval to access">
      Restricted Access
    </RadioItem>
  </RadioGroup>
);

export const CardsDisabled = () => (
  <RadioGroup
    name="access-type-disabled"
    title="Access type"
    requiredIndicator
    variant="card"
    defaultValue="open"
  >
    <RadioItem value="open" helpText="Anyone can browse and download">
      Open Access
    </RadioItem>
    <RadioItem
      value="restricted"
      helpText="Requires approval to access"
      disabled
    >
      Restricted Access
    </RadioItem>
  </RadioGroup>
);

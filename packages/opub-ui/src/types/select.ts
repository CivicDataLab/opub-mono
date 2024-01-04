import type { LabelledProps } from '../components/Labelled';
import type { Error } from './shared/form';

export interface StrictOption {
  /** Machine value of the option; this is the value passed to `onChange` */
  value: string;
  /** Human-readable text for the option */
  label: string;
  /** Option will be visible, but not selectable */
  disabled?: boolean;
  /** Element to display to the left of the option label. Does not show in the dropdown. */
  prefix?: React.ReactNode;
}

export interface HideableStrictOption extends StrictOption {
  hidden?: boolean;
}

export interface StrictGroup {
  /** Title for the group */
  title: string;
  /** List of options */
  options: StrictOption[];
}

export type SelectOption = string | StrictOption;

export interface SelectGroup {
  title: string;
  options: SelectOption[];
}

export interface SelectProps {
  /** List of options or option groups to choose from */
  options: (SelectOption | SelectGroup)[];
  /** Label for the select */
  label: React.ReactNode;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Show the label to the left of the value, inside the control */
  labelInline?: boolean;
  /** Disable input */
  disabled?: boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Example text to display as placeholder */
  placeholder?: string;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Default Select Item for select input */
  defaultValue?: string;
  /** Display an error state */
  error?: Error | boolean;
  /** Callback when selection is changed */
  onChange?(selected: string, name?: string): void;
  /** Callback when select is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
  /** Visual required indicator, add an asterisk to label */
  requiredIndicator?: boolean;

  className?: string;
}

import type { Root } from '@radix-ui/react-checkbox';
import type { Error } from './shared/form';

type CheckedState = boolean | 'indeterminate';
export interface CheckboxRadixProps
  extends Omit<typeof button, 'checked' | 'defaultChecked'> {
  /** Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox */
  checked?: CheckedState;
  /** Checkbox is selected by default but may be uncontrolled */
  defaultChecked?: CheckedState;
  /** Whether the field is required */
  required?: boolean;
  /** Callback when checkbox is toggled */
  onCheckedChange?(checked: CheckedState): void;
}

export interface CheckboxProps extends Omit<Root, 'name'>, CheckboxRadixProps {
  /** Name for form input */
  name: string;
  /** Display an error message */
  error?: Error | boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Is teh checkbox part of a group. Will output value instead of boolean */
  isMulti?: boolean;
}

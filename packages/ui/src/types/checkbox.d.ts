type CheckedState = boolean | 'indeterminate';

export interface CheckboxProps
  extends Omit<'button', 'checked' | 'defaultChecked'> {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  required?: boolean;
  onCheckedChange?(checked: CheckedState): void;
}

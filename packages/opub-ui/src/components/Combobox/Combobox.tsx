import { MultiSelect, SingleSelect } from './components';

export interface ComboboxProps {
  // List of items to render in the combobox
  allItems: {
    label: string;
    value: string;
  }[];
  // if allowMultiple, select initial items
  initialSelectedItems?: {
    label: string;
    value: string;
  }[];
  // Label for the combobox
  label?: string;
  // Allows more than one option to be selected.
  allowMultiple?: boolean;
}

export function Combobox({ allowMultiple = false, ...props }: ComboboxProps) {
  if (allowMultiple) return <MultiSelect {...props} />;

  return <SingleSelect {...props} />;
}

import type { Error, LabelledProps } from './shared/form';
import React from 'react';

type ComboboxState = {
  /**
   * The input value.
   */
  value: string;
  /**
   * Sets the `value` state.
   * @example
   * const combobox = useComboboxState();
   * combobox.setValue("new value");
   */
  setValue: any;
  /**
   * The value of the current active item when `moveType` is `keyboard`. This
   * is not updated when `moveType` is `mouse`.
   */
  activeValue?: string;
  /**
   * The list of values that will be used to populate the `matches` state,
   * which can be used to render the combobox items.
   * @default []
   */
  list: any;
  /**
   * Sets the `list` state.
   */
  setList: any;
  /**
   * Maximum number of `matches`. If it's set to `false`, there will be no
   * limit.
   * @default false
   */
  limit: number | false;
  /**
   * Result of filtering `list` based on `value`.
   * @default []
   * @example
   * const combobox = useComboboxState({ defaultList: ["Red", "Green"] });
   * combobox.matches; // ["Red", "Green"]
   * combobox.setValue("g");
   * // On next render
   * combobox.matches; // ["Green"]
   */
  matches: string[];
};

export type ComboboxSingleProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'autoComplete'
> & {
  // label for the combobox
  label?: string;
  /**
   * Default value of the combobox input.
   */
  defaultValue?: ComboboxState['value'];
  /**
   * The list of values that will be used to populate the `matches` state,
   * which can be used to render the combobox items. See `list` for more
   * information.
   * @example
   * ```jsx
   * const combobox = useComboboxState({ defaultList: ["Red", "Green"] });
   * <Combobox state={combobox} />
   * <ComboboxPopover state={combobox}>
   *   {combobox.matches.map((value) => (
   *     <ComboboxItem key={value} value={value} />
   *   ))}
   * </ComboboxPopover>
   * ```
   */
  defaultList?: ComboboxState['list'];
  /**
   * Function that will be called when setting the combobox `value` state.
   * @example
   * // Uncontrolled example
   * useComboboxState({ setValue: (value) => console.log(value) });
   * @example
   * // Controlled example
   * const [value, setValue] = useState("");
   * useComboboxState({ value, setValue });
   * @example
   * // Externally controlled example
   * function MyCombobox({ value, onChange }) {
   *   const combobox = useComboboxState({ value, setValue: onChange });
   * }
   */
  setValue?: any;
  /**
   * Function that will be called when setting the combobox `list` state.
   * @example
   * const [list, setList] = useState([]);
   * useComboboxState({ list, setList });
   */
  setList?: any;

  verticalContent?: React.ReactNode;
  combobox?: any;
  onFilter?: any;
  onChange?: (value: string) => void;
  value?: string;
  error?: Error | boolean;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Visual required indicator, add an asterisk to label */
  requiredIndicator?: boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
};

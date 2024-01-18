import React from "react";

export type ComboboxProps = {
  /**
   * The callback function that is triggered when the value of the combobox changes.
   */
  onChange?: (value: string | string[]) => void;

  /**
   * The label of the combobox.
   */
  label: string;

  /**
   * Whether the label is hidden.
   */
  labelHidden?: boolean;

  /**
   * Whether the combobox has an error.
   */
  error?: string;

  /** Visual required indicator, add an asterisk to label */
  requiredIndicator?: boolean;

  /** Additional text to aide in use */
  helpText?: React.ReactNode;

  /**
   * The placeholder of the combobox.
   */
  placeholder?: string;

  /**
   * Whether to display the selected values.
   */
  displaySelected?: boolean;

  /**
   * The value of the combobox.
   */
  selectedValue?: string[] | string;

  /**
   * The id of the combobox.
   */
  id?: string;
};

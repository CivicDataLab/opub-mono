import { LabelledProps } from '../components/Labelled';
import React from 'react';

export interface DateTimeProps {
  /** Additional hint text to display */
  helpText?: React.ReactNode;
  /** Additional error text to display */
  errorMessage?: React.ReactNode;
  /** Label for the input */
  label?: React.ReactNode;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Visual required indicator, adds an asterisk to label */
  requiredIndicator?: boolean;
}

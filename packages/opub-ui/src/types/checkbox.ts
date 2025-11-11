import type { CheckboxProps as Props } from '@radix-ui/react-checkbox';
import React, { ReactNode } from 'react';
import type { Error } from './shared/form';

export interface CheckboxProps extends Omit<Props, 'onChange' | 'children'> {
  /** Name for form input */
  name: string;
  /** Display an error message */
  error?: Error | boolean;
  /** Additional text to aide in use */
  helpText?: ReactNode;
  // Content that acts as label for checkbox
  children?: ReactNode;
  // Should the label be hidden
  labelHidden?: boolean;
  // id for aria description
  ariaDescribedBy?: string;
  /** Callback when the checked state change */
  onChange?(selected: boolean | string, name: string | undefined): void;
}

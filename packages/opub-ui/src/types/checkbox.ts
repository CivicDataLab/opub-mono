import type { CheckboxProps as Props } from '@radix-ui/react-checkbox';
import React from 'react';
import type { Error } from './shared/form';

export interface CheckboxProps extends Props {
  /** Name for form input */
  name: string;
  /** Display an error message */
  error?: Error | boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  children?: React.ReactNode;
  labelHidden?: boolean;
  ariaDescribedBy?: string | null;
}

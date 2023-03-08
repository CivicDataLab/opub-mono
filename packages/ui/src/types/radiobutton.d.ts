import type { Error } from './shared/form';

export interface RadioButtonProps {
  /** Name for form input */
  name: string;

  /** Additional text to aide in use */
  helpText?: React.ReactNode;
}

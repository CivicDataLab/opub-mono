import { Error } from './shared/form';

export interface ChoiceProps {
  /** Value of the choice */
  value: string;
  /** Label for the choice */
  label: React.ReactNode;
  /** A unique identifier for the choice */
  id?: string;
  /** Disable choice */
  disabled?: boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Indicates that the choice is aria-describedBy the error message*/
  describedByError?: boolean;
  /**  Method to render children with a choice */
  renderChildren?(isSelected: boolean): React.ReactNode | false;
}

export interface ChoiceListProps {
  /** Label for list of choices */
  title: React.ReactNode;
  /** Collection of choices */
  choices: ChoiceProps[];
  /** Name for form input */
  name?: string;
  /** Toggles display of the title */
  titleHidden?: boolean;
  /** Display an error message */
  error?: Error;
  /** Disable all choices **/
  disabled?: boolean;
  /** Callback when the selected choices change */
  onChange?(selected: string[], name: string): void;
}

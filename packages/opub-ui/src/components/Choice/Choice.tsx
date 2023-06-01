import { InlineMessage } from '../InlineMessage';
import { Label } from '../Label';
import { Text } from '../Text';
import styles from './Choice.module.scss';
import cx from 'classnames';

export interface ChoiceProps {
  /** A unique identifier for the choice */
  id: string;
  /**	Label for the choice */
  label: React.ReactNode;
  /** Whether the associated form control is disabled */
  disabled?: boolean;
  /** Display an error message */
  error?: any;
  /** Visually hide the label */
  labelHidden?: boolean;
  /**  Content to display inside the choice */
  children?: React.ReactNode;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Callback when clicked */
  onClick?(): void;
  /** Callback when mouse over */
  onMouseOver?(): void;
  /** Callback when mouse out */
  onMouseOut?(): void;
  /** add classname */
  className?: string;
}

export const Choice = ({
  children,
  label,
  id,
  className,
  labelHidden,
  ...props
}: ChoiceProps) => {
  const { error, helpText } = props;

  const wrapperClassName = cx(
    styles.Checkbox,
    error && styles.error,
    className
  );

  const hiddenLabel = cx(labelHidden && styles.hidden);
  const checkboxMarkup = (
    <div className={wrapperClassName}>
      {children}

      <div className={hiddenLabel}>
        <Label disabled={!!props.disabled} htmlFor={id}>
          {label}
        </Label>
      </div>
    </div>
  );

  const helpTextMarkup = helpText ? (
    <div className={styles.HelpText} id={`${id}HelpText`}>
      <Text as="span" variant="bodyMd" color="subdued">
        {helpText}
      </Text>
    </div>
  ) : null;

  const errorMarkup = error && typeof error !== 'boolean' && (
    <div className={styles.ErrorMessage}>
      <InlineMessage message={error} fieldID={id} />
    </div>
  );

  const descriptionMarkup =
    helpTextMarkup || errorMarkup ? (
      <div className={styles.Descriptions}>
        {errorMarkup}
        {helpTextMarkup}
      </div>
    ) : null;

  return descriptionMarkup ? (
    <div>
      {checkboxMarkup}
      {descriptionMarkup}
    </div>
  ) : (
    checkboxMarkup
  );
};

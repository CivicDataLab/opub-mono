import { ChoiceListProps } from '@ui/types/choicelist';
import cx from 'classnames';
import { useId } from 'react';
import { Checkbox } from '../Checkbox';
import { InlineMessage } from '../InlineMessage';
import { Text } from '../Text';
import styles from './CheckboxGroup.module.scss';

export function CheckboxGroup({
  title,
  titleHidden = false,
  choices,
  error,
  disabled = false,
  name: nameProp,
}: ChoiceListProps) {
  const name = useId();
  const finalName = nameProp || name;

  const wrapperClassName = cx(styles.CheckboxGroup);

  const titleMarkup = title ? (
    <Text variant="bodyMd" as="legend" visuallyHidden={titleHidden}>
      {title}
    </Text>
  ) : null;

  const choicesMarkup = choices.map((choice, index) => {
    const {
      value,
      id,
      label,
      helpText,
      disabled: choiceDisabled,
      describedByError,
    } = choice;

    return (
      <li key={value}>
        <Checkbox
          name={`${finalName}[${index}]`}
          value={value}
          id={id}
          disabled={choiceDisabled || disabled}
          helpText={helpText}
          ariaDescribedBy={
            error && describedByError ? `${finalName}-error` : null
          }
        >
          {label}
        </Checkbox>
      </li>
    );
  });

  const errorMarkup = error && (
    <div className={styles.ChoiceError}>
      <InlineMessage message={error} fieldID={finalName} />
    </div>
  );

  return (
    <fieldset
      aria-invalid={error != null}
      id={finalName}
      className={wrapperClassName}
    >
      {titleMarkup}
      <ul>{choicesMarkup}</ul>
      {errorMarkup}
    </fieldset>
  );
}

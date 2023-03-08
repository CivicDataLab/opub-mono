import { Choice, ChoiceListProps } from '@ui/types/choicelist';
import cx from 'classnames';
import { useId } from 'react';
import { Checkbox } from '../Checkbox';
import { InlineError } from '../InlineError';
import { errorTextID } from '../InlineError/InlineError';
import styles from './ChoiceList.module.scss';
import { Text } from '../Text';

export function ChoiceList({
  title,
  titleHidden = false,
  allowMultiple,
  choices,
  selected,
  onChange = noop,
  error,
  disabled = false,
  name: nameProp,
}: ChoiceListProps) {
  const ControlComponent: any = allowMultiple ? Checkbox : <></>;

  const name = useId();
  const finalName = nameProp || name;

  const wrapperClassName = cx(styles.ChoiceList);

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

    function handleChange(checked: boolean) {
      onChange(
        updateSelectedChoices(choice, checked, selected, allowMultiple),
        finalName
      );
    }

    const isSelected = choiceIsSelected(choice, selected);
    const renderedChildren = choice.renderChildren ? (
      <div className={styles.ChoiceChildren}>
        <div>{choice.renderChildren(isSelected)}</div>
      </div>
    ) : null;

    return (
      <li key={value}>
        <ControlComponent
          name={allowMultiple ? `${finalName}[${index}]` : finalName}
          value={value}
          id={id}
          renderChildren={!allowMultiple ? renderedChildren : null}
          disabled={choiceDisabled || disabled}
          checked={choiceIsSelected(choice, selected)}
          helpText={helpText}
          onChange={handleChange}
          ariaDescribedBy={
            error && describedByError ? errorTextID(finalName) : null
          }
        >
          {label}
        </ControlComponent>
      </li>
    );
  });

  const errorMarkup = error && (
    <div className={styles.ChoiceError}>
      <InlineError message={error} fieldID={finalName} />
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

function noop() {}

function choiceIsSelected({ value }: Choice, selected: string[]) {
  return selected.includes(value);
}

function updateSelectedChoices(
  { value }: Choice,
  checked: boolean,
  selected: string[],
  allowMultiple = false
) {
  if (checked) {
    return allowMultiple ? [...selected, value] : [value];
  }

  return selected.filter((selectedChoice) => selectedChoice !== value);
}

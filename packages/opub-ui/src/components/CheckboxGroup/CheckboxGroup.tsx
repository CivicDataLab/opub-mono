import cx from 'classnames';
import React, { useId } from 'react';
import { CheckboxGroupProps } from '../../types/choicelist';
import { Checkbox } from '../Checkbox';
import { InlineMessage } from '../InlineMessage';
import { Text } from '../Text';
import styles from './CheckboxGroup.module.scss';

export function CheckboxGroup({
  title,
  titleHidden = false,
  options,
  error,
  disabled = false,
  name: nameProp,
  defaultValue,
  onChange,
}: CheckboxGroupProps) {
  const [selected, setSelected] = React.useState(defaultValue || []);

  const name = useId();
  const finalName = nameProp || name;

  React.useEffect(() => {
    if (onChange) {
      onChange(selected, nameProp);
    }
  }, [selected]);

  function handleClick(checked: boolean | string, value: string) {
    const nextArr = [...selected];
    if (checked === true) {
      nextArr.push(value);
      setSelected(nextArr);
      return;
    }

    const index = nextArr.indexOf(value);
    if (index > -1) {
      nextArr.splice(index, 1);
      setSelected(nextArr);
    }
  }

  const wrapperClassName = cx(styles.CheckboxGroup);
  const titleMarkup = title ? (
    <Text variant="bodyMd" as="legend" visuallyHidden={titleHidden}>
      {title}
    </Text>
  ) : null;

  const choicesMarkup = options.map((option, index) => {
    const {
      value,
      id,
      label,
      helpText,
      disabled: choiceDisabled,
      describedByError,
    } = option;

    return (
      <li key={value + index}>
        <Checkbox
          name={`${finalName}[${index}]`}
          value={value}
          id={id}
          defaultChecked={selected.includes(value)}
          onChange={(e) => handleClick(e, value)}
          disabled={choiceDisabled || disabled}
          helpText={helpText}
          ariaDescribedBy={
            error && describedByError ? `${finalName}-error` : undefined
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

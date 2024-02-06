import React, { useId } from 'react';

import { CheckboxGroupProps } from '../../types/choicelist';
import { cn } from '../../utils';
import { Checkbox } from '../Checkbox';
import { InlineMessage } from '../InlineMessage';
import { Text } from '../Text';
import styles from './CheckboxGroup.module.scss';

export const CheckboxGroup = React.forwardRef(
  (
    {
      title,
      titleHidden = false,
      options,
      error,
      disabled = false,
      name: nameProp,
      defaultValue,
      value,
      onChange,
    }: CheckboxGroupProps,
    ref: React.LegacyRef<HTMLFieldSetElement>
  ) => {
    const [selected, setSelected] = React.useState<any>(
      defaultValue || value || []
    );
    const name = useId();
    const finalName = nameProp || name;

    React.useEffect(() => {
      handleSelectChange(value || defaultValue || []);
    }, [value]);

    const handleSelectChange = React.useCallback(
      (value: string[] | undefined) => setSelected(value),
      []
    );

    function handleClick(checked: boolean | string, value: string) {
      const nextArr = [...selected];
      if (checked === true) {
        nextArr.push(value);
        setSelected(nextArr);
      } else {
        const index = nextArr.indexOf(value);
        if (index > -1) {
          nextArr.splice(index, 1);
          setSelected(nextArr);
        }
      }
      onChange && onChange(nextArr, nameProp);
    }

    const wrapperClassName = cn(styles.CheckboxGroup);
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
        <li key={value}>
          <Checkbox
            name={`${finalName}[${index}]`}
            value={value}
            id={id}
            defaultChecked={selected?.includes(value)}
            checked={value && selected?.includes(value)}
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
        ref={ref}
      >
        {titleMarkup}
        <ul>{choicesMarkup}</ul>
        {errorMarkup}
      </fieldset>
    );
  }
);

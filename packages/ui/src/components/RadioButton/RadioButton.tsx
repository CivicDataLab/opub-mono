import * as RadioRadix from '@radix-ui/react-radio-group';
import { RadioButtonProps } from '@ui/types/radiobutton';
import cx from 'classnames';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Choice } from '../Choice';
import styles from './RadioButton.module.scss';

type RadixProps = React.ComponentProps<typeof RadioRadix.Root> & {
  name: string;
};
interface Props extends RadixProps, RadioButtonProps {
  value: string;
}

const RadioGroup = ({ name, children, ...otherProps }: RadixProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      {...otherProps}
      render={({ field }) => {
        return (
          <RadioRadix.Root
            {...field}
            {...otherProps}
            onValueChange={(val) => {
              field.onChange(val);
            }}
          >
            {children}
          </RadioRadix.Root>
        );
      }}
    />
  );
};

const RadioItem = ({ children, name, ...props }: Props) => {
  const { helpText, value, disabled, id, required } = props;

  const randomId = React.useId();
  const finalId = id || randomId;

  const inputClassName = cx(
    styles.RadioItem,
    props.disabled && styles.Disabled
  );

  const checkboxMarkup = (
    <Choice
      id={finalId}
      label={children}
      helpText={helpText}
      disabled={disabled}
    >
      <RadioRadix.Item
        value={value}
        className={inputClassName}
        id={finalId}
        disabled={disabled}
        required={required}
      >
        <RadioRadix.Indicator className={styles.RadioIndicator} />
      </RadioRadix.Item>
    </Choice>
  );

  return checkboxMarkup;
};

export { RadioItem, RadioGroup };

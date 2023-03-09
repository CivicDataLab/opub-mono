import * as RadioRadix from '@radix-ui/react-radio-group';
import { RadioGroupProps } from '@ui/types/radiogroup';
import type { Error } from '@ui/types/shared/form';
import cx from 'classnames';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Choice } from '../Choice';
import { InlineError } from '../InlineError';
import styles from './RadioGroup.module.scss';

type RadixProps = React.ComponentProps<typeof RadioRadix.Root> & {
  name: string;
  /** Display an error message */
  error?: Error;
};
interface Props extends RadixProps, RadioGroupProps {
  value: string;
}

const RadioGroup = ({ name, children, error, ...otherProps }: RadixProps) => {
  const { control } = useFormContext();
  const randomId = React.useId();
  const finalId = otherProps.id || randomId;

  const errorMarkup = error && (
    <div className={styles.RadioError}>
      <InlineError message={error} fieldID={finalId} />
    </div>
  );
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
            {errorMarkup}
          </RadioRadix.Root>
        );
      }}
    />
  );
};

const RadioItem = ({ children, name, ...props }: Props) => {
  const { helpText, value, disabled, required } = props;
  const id = React.useId();

  const inputClassName = cx(
    styles.RadioItem,
    props.disabled && styles.Disabled
  );

  const checkboxMarkup = (
    <Choice label={children} helpText={helpText} disabled={disabled} id={id}>
      <RadioRadix.Item
        id={id}
        value={value}
        className={inputClassName}
        disabled={disabled}
        required={required}
      >
        <RadioRadix.Indicator forceMount className={styles.RadioIndicator} />
      </RadioRadix.Item>
    </Choice>
  );

  return checkboxMarkup;
};

export { RadioItem, RadioGroup };

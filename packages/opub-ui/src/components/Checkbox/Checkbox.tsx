import { CheckmarkSize100, DashSize100 } from '@opub-icons/ui';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { CheckboxProps } from '../../types/checkbox';
import cx from 'classnames';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Choice } from '../Choice';
import styles from './Checkbox.module.scss';

const Checkbox = ({ children, name, ...props }: CheckboxProps) => {
  const { control } = useFormContext();
  const { error, helpText, labelHidden, ...otherProps } = props;

  const id = React.useId();
  const isIndeterminate = props.checked === 'indeterminate';

  const inputClassName = cx(
    styles.Input,
    error && styles.Error,
    props.disabled && styles.Disabled
  );

  const IconSource = isIndeterminate ? DashSize100 : CheckmarkSize100;

  const checkboxMarkup = (
    <Choice
      id={id}
      label={children}
      labelHidden={labelHidden}
      helpText={helpText}
      error={error}
      disabled={props.disabled}
    >
      <Controller
        control={control}
        name={name}
        {...otherProps}
        render={({ field }) => {
          return (
            <CheckboxRadix.Root
              {...field}
              {...otherProps}
              className={inputClassName}
              id={id}
              checked={
                props.value
                  ? field.value === props.value
                  : props.checked || field.value
              }
              onCheckedChange={(checked) => {
                field.onChange(checked ? props.value : undefined);
                props.value
                  ? field.onChange(checked ? props.value : undefined)
                  : field.onChange(checked);
              }}
            >
              <span className={styles.Indicator}>
                <CheckboxRadix.Indicator>
                  <IconSource />
                </CheckboxRadix.Indicator>
              </span>
            </CheckboxRadix.Root>
          );
        }}
      />
    </Choice>
  );

  return checkboxMarkup;
};

export { Checkbox };

export const UncontrolledCheckbox = ({
  children,
  name,
  ...props
}: CheckboxProps) => {
  const { error, helpText, labelHidden, ...otherProps } = props;

  const id = React.useId();
  const isIndeterminate = props.checked === 'indeterminate';

  const inputClassName = cx(
    styles.Input,
    error && styles.Error,
    props.disabled && styles.Disabled
  );

  const IconSource = isIndeterminate ? DashSize100 : CheckmarkSize100;

  const checkboxMarkup = (
    <Choice
      id={id}
      label={children}
      labelHidden={labelHidden}
      helpText={helpText}
      error={error}
      disabled={props.disabled}
    >
      <CheckboxRadix.Root {...otherProps} className={inputClassName} id={id}>
        <span className={styles.Indicator}>
          <CheckboxRadix.Indicator>
            <IconSource />
          </CheckboxRadix.Indicator>
        </span>
      </CheckboxRadix.Root>
    </Choice>
  );

  return checkboxMarkup;
};

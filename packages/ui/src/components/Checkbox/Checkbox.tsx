import { CheckmarkSize100, DashSize100 } from '@opub-icons/ui';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { CheckboxProps } from '@ui/types/checkbox';
import cx from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import { InlineError } from '../InlineError';
import { Label } from '../Label';
import { Text } from '../Text';
import styles from './Checkbox.module.scss';

const Checkbox = ({ children, name, ...props }: CheckboxProps) => {
  const { error, helpText, isMulti, control, ...otherProps } = props;

  const id = React.useId();
  const isIndeterminate = props.checked === 'indeterminate';

  const wrapperClassName = cx(styles.Checkbox, error && styles.error);
  const inputClassName = cx(
    styles.Input,
    error && styles.Error,
    props.disabled && styles.Disabled
  );

  const IconSource = isIndeterminate ? DashSize100 : CheckmarkSize100;

  const checkboxMarkup = (
    <div className={wrapperClassName}>
      <Controller
        control={control}
        name={name}
        {...otherProps}
        render={({ field }) => (
          <CheckboxRadix.Root
            {...field}
            className={inputClassName}
            id={id}
            value={props.value || null}
            checked={props.value ? field.value === props.value : field.value}
            onCheckedChange={(checked) => {
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
        )}
      />

      <Label disabled={!!props.disabled} htmlFor={id}>
        {children}
      </Label>
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
      <InlineError message={error} fieldID={id} />
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

export { Checkbox };

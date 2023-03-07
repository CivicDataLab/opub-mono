import { CheckmarkSize100, DashSize100 } from '@opub-icons/ui';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { CheckboxProps } from '@ui/types/checkbox';
import cx from 'classnames';
import { useField } from 'formik';
import React from 'react';
import { Label } from '../Label';
import styles from './Checkbox.module.scss';

const Checkbox = ({ children, name, ...props }: CheckboxProps) => {
  const { error, helpText, ...otherProps } = props;
  const [field, meta, helpers] = useField(name);
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
      <CheckboxRadix.Root
        {...field}
        {...otherProps}
        className={inputClassName}
        id={id}
      >
        <span className={styles.Indicator}>
          <CheckboxRadix.Indicator>
            <IconSource />
          </CheckboxRadix.Indicator>
        </span>
      </CheckboxRadix.Root>

      <Label disabled={!!props.disabled} htmlFor={id}>
        {children}
      </Label>
    </div>
  );

  const helpTextMarkup = helpText ? (
    <div className={styles.HelpText}>
      <span>{helpText}</span>
    </div>
  ) : null;

  const errorMarkup = error && typeof error !== 'boolean' && (
    <div className={styles.Error}>
      <span>{error}</span>
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

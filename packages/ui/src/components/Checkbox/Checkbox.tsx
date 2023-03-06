import { CheckmarkSize100, DashSize100 } from '@opub-icons/ui';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { CheckboxProps } from '@ui/types/checkbox';
import cx from 'classnames';
import { useField } from 'formik';
import React from 'react';
import { Label } from '../Label';
import styles from './Checkbox.module.scss';

const Checkbox = ({ children, name, ...props }: CheckboxProps) => {
  const [field, meta, helpers] = useField(name);
  const id = React.useId();
  const isIndeterminate = props.checked === 'indeterminate';

  const wrapperClassName = cx(styles.Checkbox, props.error && styles.error);
  const inputClassName = cx(
    styles.Input,
    isIndeterminate && styles['Input-indeterminate'],
    props.error && styles.Error,
    props.disabled && styles.Disabled
  );

  const IconSource = isIndeterminate ? DashSize100 : CheckmarkSize100;

  return (
    <div className={wrapperClassName}>
      <CheckboxRadix.Root
        {...field}
        {...props}
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
};

export { Checkbox };

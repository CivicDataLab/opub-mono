import { CheckboxProps } from '../../types/checkbox';
import { Choice } from '../Choice';
import { Icon } from '../Icon';
import styles from './Checkbox.module.scss';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { IconCheck, IconMinus } from '@tabler/icons-react';
import cx from 'classnames';
import React, { forwardRef } from 'react';

const Checkbox = forwardRef(
  (
    { children, name, ariaDescribedBy, ...props }: CheckboxProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const { error, helpText, labelHidden, onChange, ...otherProps } = props;

    const id = React.useId();
    const isIndeterminate = props.checked === 'indeterminate';

    const inputClassName = cx(
      styles.Input,
      error && styles.Error,
      props.disabled && styles.Disabled
    );

    const iconSource = isIndeterminate ? IconMinus : IconCheck;

    const checkboxMarkup = (
      <Choice
        id={id}
        label={children}
        labelHidden={labelHidden}
        helpText={helpText}
        error={error}
        disabled={props.disabled}
      >
        <CheckboxRadix.Root
          aria-describedby={ariaDescribedBy}
          {...otherProps}
          ref={ref}
          onCheckedChange={(selected) => onChange && onChange(selected, name)}
          className={inputClassName}
          id={id}
        >
          <span className={styles.Indicator}>
            <CheckboxRadix.Indicator>
              <Icon
                source={iconSource}
                size="4"
                color="onBgDefault"
                stroke={3}
              />
            </CheckboxRadix.Indicator>
          </span>
        </CheckboxRadix.Root>
      </Choice>
    );

    return checkboxMarkup;
  }
);

export { Checkbox };

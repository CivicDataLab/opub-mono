import cx from 'classnames';
import React from 'react';
import styles from './InputBase.module.scss';

import { SpectrumTextFieldProps } from '@react-types/textfield';
import { useTextField } from 'react-aria';

export interface TextFieldProps extends SpectrumTextFieldProps {
  indicator?: true | false | 'label' | 'icon';
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  maxLength?: number;
  showLimit?: boolean;
}

const InputBase = (props: TextFieldProps) => {
  let { label, isRequired, indicator = isRequired, showLimit = true } = props;

  let inputRef = React.useRef<HTMLInputElement>(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, inputRef);

  const themeClass = cx(styles.input, {
    [styles[`input--${props.validationState}`]]: props.validationState,
    [styles[`input--disabled`]]: props.isDisabled,
    [styles[`input__iconStart`]]: props.iconStart,
    [styles[`input__iconEnd`]]: props.iconEnd,
  });

  return (
    <div className={`opub-InputBase ${themeClass}`}>
      <label className={styles.label} {...labelProps}>
        {label}
        {indicator && (
          <span className={styles.indicator}>
            {!isRequired ? (
              <>&nbsp;(Optional)</>
            ) : indicator == 'label' ? (
              '*'
            ) : (
              <>&nbsp;(Required)</>
            )}
          </span>
        )}
      </label>
      <div>
        {props.iconStart && props.iconStart}
        <input
          {...inputProps}
          ref={inputRef}
          required={props.isRequired || false}
          maxLength={props.maxLength || 200}
        />
        {props.iconEnd && props.iconEnd}
      </div>
      <span className={styles.description} {...descriptionProps}>
        {props.description}
      </span>
    </div>
  );
};

const _InputBase = React.forwardRef(InputBase);
export { _InputBase as InputBase };

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
  minLength?: number;
  showLimit?: boolean;
  externalHelpLink?: string;
}

const InputBase = (props: TextFieldProps) => {
  let { label, isRequired, indicator = isRequired, showLimit = true } = props;

  let inputRef = React.useRef<HTMLInputElement>(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, inputRef);
  let inputValue: any = inputProps.value;

  const themeClass = cx(styles.input, {
    [styles[`input--${props.validationState}`]]: props.validationState,
    [styles[`input--disabled`]]: props.isDisabled,
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
      <input
        {...inputProps}
        ref={inputRef}
        required={props.isRequired || false}
        maxLength={props.maxLength || 200}
      />
    </div>
  );
};

const _InputBase = React.forwardRef(InputBase);
export { _InputBase as InputBase };

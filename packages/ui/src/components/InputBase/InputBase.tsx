import cx from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import styles from './InputBase.module.scss';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  indicator?: true | false | 'label' | 'icon';
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  maxLength?: number;
  className?: string;
  isRequired?: boolean;
  label: string;
  validationState?: 'valid' | 'invalid';
  isDisabled?: boolean;
  description?: string;
  errorMessage?: string | null;
}

const InputBase = (props: InputProps) => {
  let {
    label,
    isRequired,
    indicator = isRequired,
    iconStart,
    iconEnd,
    maxLength,
    className,
    validationState,
    isDisabled,
    description,
    errorMessage,
    ...inputProps
  } = props;

  const themeClass = cx(styles.input, {
    [styles[`input--${validationState}`]]: validationState,
    [styles[`input--invalid`]]: errorMessage,
    [styles[`input--disabled`]]: isDisabled,
    [styles[`input__iconStart`]]: iconStart,
    [styles[`input__iconEnd`]]: iconEnd,
  });

  return (
    <div className={`${className ? className : ''} ${themeClass}`}>
      <label className={styles.label}>
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
        {iconStart && iconStart}
        <input
          {...inputProps}
          required={isRequired || false}
          maxLength={maxLength || 200}
        />
        {iconEnd && iconEnd}
      </div>
      <span className={styles.description}>{description}</span>
      {errorMessage ? (
        <span className={styles.error}>{errorMessage}</span>
      ) : null}
    </div>
  );
};

const _InputBase = React.forwardRef(InputBase);
export { _InputBase as InputBase };

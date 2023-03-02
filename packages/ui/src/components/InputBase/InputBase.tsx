import { InputProps } from '@ui/types/Input';
import cx from 'classnames';
import React from 'react';
import { Label } from '../Label';
import styles from './InputBase.module.scss';

export const InputBase = React.forwardRef((props: InputProps, ref) => {
  let {
    label,
    isRequired,
    indicator = isRequired,
    iconStart,
    iconEnd,
    maxLength,
    className,
    validationState,
    isDisabled = false,
    description,
    errorMessage,
    as = 'input',
    fluid = false,
    isReadOnly = false,
    ...inputProps
  } = props;

  const themeClass = cx(styles.input, {
    [styles[`input--invalid`]]: errorMessage,
    [styles[`input--${validationState}`]]: validationState,
    [styles[`input--disabled`]]: isDisabled,
    [styles[`input--fluid`]]: fluid,
    [styles[`input__iconStart`]]: iconStart,
    [styles[`input__iconEnd`]]: iconEnd,
  });

  const InputComp: any = as;
  const id = React.useId();

  return (
    <div className={`${className ? className : ''} ${themeClass}`}>
      <Label
        className={styles.label}
        htmlFor={id}
        error={errorMessage || validationState === 'invalid' ? true : false}
      >
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
      </Label>
      <div>
        {iconStart && iconStart}
        <InputComp
          id={id}
          {...inputProps}
          disabled={isDisabled}
          required={isRequired || false}
          maxLength={maxLength || null}
          readOnly={isReadOnly}
          ref={ref}
        />
        {iconEnd && iconEnd}
      </div>
      <span className={styles.description}>{description}</span>
      {errorMessage ? (
        <span className={styles.error}>{errorMessage}</span>
      ) : null}
    </div>
  );
});

import { CloseCircle } from '@opub-icons/workflow';
import { TextFieldProps } from '@ui/types/input';
import { Key } from '@ui/types/shared/key';
import { variationName } from '@ui/utils/css';
import { useForwardRef } from '@ui/utils/helpers';
import { useIsAfterInitialMount } from '@ui/utils/hooks';
import cx from 'classnames';
import React, {
  createElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Connected } from '../Connected';
import { Labelled } from '../Labelled';
import { Text } from '../Text';
import { Resizer, Spinner, SpinnerProps } from './components';
import styles from './Input.module.scss';

export const Input = React.forwardRef(
  (
    {
      prefix,
      suffix,
      verticalContent,
      placeholder,
      value = '',
      helpText,
      label,
      labelAction,
      labelHidden,
      disabled,
      clearButton,
      readOnly,
      autoFocus,
      focused,
      multiline,
      error,
      connectedRight,
      connectedLeft,
      type = 'text',
      name,
      id: idProp,
      role,
      step,
      autoComplete = 'on',
      max,
      maxLength,
      maxHeight,
      min,
      minLength,
      pattern,
      inputMode,
      spellCheck,
      ariaOwns,
      ariaControls,
      ariaExpanded,
      ariaActiveDescendant,
      ariaAutocomplete,
      showCharacterCount,
      align,
      requiredIndicator,
      monospaced,
      selectTextOnFocus,
      suggestion,
      onClearButtonClick,
      onChange,
      onFocus,
      onBlur,
    }: TextFieldProps,
    ref: React.ForwardedRef<HTMLInputElement | null>
  ) => {
    const [height, setHeight] = useState<number | null>(null);
    const [focus, setFocus] = useState(Boolean(focused));
    const isAfterInitial = useIsAfterInitialMount();

    const randomId = useId();
    const id = idProp || randomId;

    const inputRef = useForwardRef<HTMLInputElement>(ref);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const prefixRef = useRef<HTMLDivElement>(null);
    const suffixRef = useRef<HTMLDivElement>(null);
    const verticalContentRef = useRef<HTMLDivElement>(null);
    const buttonPressTimer = useRef<number>();
    const spinnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const input = multiline ? textAreaRef.current : inputRef?.current;
      if (!input || focused === undefined) return;
      focused ? input.focus() : input.blur();
    }, [focused, verticalContent, multiline, inputRef]);

    useEffect(() => {
      const input = inputRef?.current;
      const isSupportedInputType =
        type === 'text' ||
        type === 'tel' ||
        type === 'search' ||
        type === 'url' ||
        type === 'password';

      if (!input || !isSupportedInputType || !suggestion) {
        return;
      }

      input.setSelectionRange(value.length, suggestion.length);
    }, [focus, value, type, suggestion, inputRef]);

    const normalizedValue = suggestion ? suggestion : value;
    const normalizedStep = step != null ? step : 1;
    const normalizedMax = max != null ? max : Infinity;
    const normalizedMin = min != null ? min : -Infinity;

    const className = cx(
      styles.TextField,
      Boolean(normalizedValue) && styles.hasValue,
      disabled && styles.disabled,
      readOnly && styles.readOnly,
      error && styles.error,
      multiline && styles.multiline,
      focus && styles.focus
    );

    const inputType = type === 'currency' ? 'text' : type;

    const prefixMarkup = prefix ? (
      <div className={styles.Prefix} id={`${id}-Prefix`} ref={prefixRef}>
        {prefix}
      </div>
    ) : null;

    const suffixMarkup = suffix ? (
      <div className={styles.Suffix} id={`${id}-Suffix`} ref={suffixRef}>
        {suffix}
      </div>
    ) : null;

    let characterCountMarkup = null;
    if (showCharacterCount) {
      const characterCount = normalizedValue.length;
      const characterCountLabel = 'character count'; //TODO: add count logic

      const characterCountClassName = cx(
        styles.CharacterCount,
        multiline && styles.AlignFieldBottom
      );

      const characterCountText = !maxLength
        ? characterCount
        : `${characterCount}/${maxLength}`;

      characterCountMarkup = (
        <div
          id={`${id}-CharacterCounter`}
          className={characterCountClassName}
          aria-label={characterCountLabel}
          aria-live={focus ? 'polite' : 'off'}
          aria-atomic="true"
          onClick={handleClickChild}
        >
          {characterCountText}
        </div>
      );
    }

    const clearButtonVisible = normalizedValue !== '';

    const clearButtonMarkup =
      clearButton && clearButtonVisible ? (
        <button
          type="button"
          className={styles.ClearButton}
          onClick={handleClearButtonPress}
          disabled={disabled}
        >
          <Text as="span" visuallyHidden>
            clear input
          </Text>
          <CloseCircle size={14} />
        </button>
      ) : null;

    const handleNumberChange = useCallback(
      (steps: number) => {
        if (onChange == null) {
          return;
        }
        // Returns the length of decimal places in a number
        const dpl = (num: number) =>
          (num.toString().split('.')[1] || []).length;

        const numericValue = value ? parseFloat(value) : 0;
        if (isNaN(numericValue)) {
          return;
        }

        // Making sure the new value has the same length of decimal places as the
        // step / value has.
        const decimalPlaces = Math.max(dpl(numericValue), dpl(normalizedStep));

        const newValue = Math.min(
          Number(normalizedMax),
          Math.max(numericValue + steps * normalizedStep, Number(normalizedMin))
        );

        onChange(String(newValue.toFixed(decimalPlaces)), id);
      },
      [id, normalizedMax, normalizedMin, onChange, normalizedStep, value]
    );

    const handleButtonRelease = useCallback(() => {
      clearTimeout(buttonPressTimer.current);
    }, []);

    const handleButtonPress: SpinnerProps['onMouseDown'] = useCallback(
      (onChange) => {
        const minInterval = 50;
        const decrementBy = 10;
        let interval = 200;

        const onChangeInterval = () => {
          if (interval > minInterval) interval -= decrementBy;
          onChange(0);
          buttonPressTimer.current = window.setTimeout(
            onChangeInterval,
            interval
          );
        };

        buttonPressTimer.current = window.setTimeout(
          onChangeInterval,
          interval
        );

        document.addEventListener('mouseup', handleButtonRelease, {
          once: true,
        });
      },
      [handleButtonRelease]
    );

    const spinnerMarkup =
      type === 'number' && step !== 0 && !disabled && !readOnly ? (
        <Spinner
          onClick={handleClickChild}
          onChange={handleNumberChange}
          onMouseDown={handleButtonPress}
          onMouseUp={handleButtonRelease}
          ref={spinnerRef}
          onBlur={handleOnBlur}
        />
      ) : null;

    const style = multiline && height ? { height, maxHeight } : null;

    const handleExpandingResize = useCallback((height: number) => {
      setHeight(height);
    }, []);

    const resizer =
      multiline && isAfterInitial ? (
        <Resizer
          contents={normalizedValue || placeholder}
          currentHeight={height}
          minimumLines={typeof multiline === 'number' ? multiline : 1}
          onHeightChange={handleExpandingResize}
        />
      ) : null;

    const describedBy: string[] = [];
    if (error) {
      describedBy.push(`${id}Error`);
    }
    if (helpText) {
      describedBy.push(`${id}-help`);
    }
    if (showCharacterCount) {
      describedBy.push(`${id}-CharacterCounter`);
    }

    const labelledBy: string[] = [];

    if (prefix) {
      labelledBy.push(`${id}-Prefix`);
    }

    if (suffix) {
      labelledBy.push(`${id}-Suffix`);
    }

    if (verticalContent) {
      labelledBy.push(`${id}-VerticalContent`);
    }

    labelledBy.unshift(`${id}-label`);

    const inputClassName = cx(
      styles.Input,
      align && styles[variationName('Input-align', align)],
      suffix && styles['Input-suffixed'],
      clearButton && styles['Input-hasClearButton'],
      monospaced && styles.monospaced,
      suggestion && styles.suggestion
    );

    const handleOnFocus = (
      event: React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLInputElement>
    ) => {
      setFocus(true);

      if (selectTextOnFocus && !suggestion) {
        const input = multiline ? textAreaRef.current : inputRef.current;
        input?.select();
      }

      if (onFocus) {
        onFocus(event as React.FocusEvent<HTMLInputElement>);
      }
    };

    const input = createElement(multiline ? 'textarea' : 'input', {
      name,
      id,
      disabled,
      readOnly,
      role,
      autoFocus,
      value: normalizedValue,
      placeholder,
      style,
      autoComplete,
      className: inputClassName,
      ref: multiline ? textAreaRef : inputRef,
      min,
      max,
      step,
      minLength,
      maxLength,
      spellCheck,
      pattern,
      inputMode,
      type: inputType,
      rows: getRows(multiline),
      'aria-describedby': describedBy.length
        ? describedBy.join(' ')
        : undefined,
      'aria-labelledby': labelledBy.join(' '),
      'aria-invalid': Boolean(error),
      'aria-owns': ariaOwns,
      'aria-activedescendant': ariaActiveDescendant,
      'aria-autocomplete': ariaAutocomplete,
      'aria-controls': ariaControls,
      'aria-expanded': ariaExpanded,
      'aria-required': requiredIndicator,
      ...normalizeAriaMultiline(multiline),
      onFocus: handleOnFocus,
      onBlur: handleOnBlur,
      onClick: handleClickChild,
      onKeyPress: handleKeyPress,
      onChange: !suggestion ? handleChange : undefined,
      onInput: suggestion ? handleChange : undefined,
    });

    const inputWithVerticalContentMarkup = verticalContent ? (
      <div
        className={styles.VerticalContent}
        id={`${id}-VerticalContent`}
        ref={verticalContentRef}
        onClick={handleClickChild}
      >
        {verticalContent}
        {input}
      </div>
    ) : null;

    const inputMarkup = verticalContent
      ? inputWithVerticalContentMarkup
      : input;

    const backdropMarkup = (
      <div
        className={cx(
          styles.Backdrop,
          connectedLeft && styles['Backdrop-connectedLeft'],
          connectedRight && styles['Backdrop-connectedRight']
        )}
      />
    );

    return (
      <Labelled
        label={label}
        id={id}
        error={error}
        action={labelAction}
        labelHidden={labelHidden}
        helpText={helpText}
        requiredIndicator={requiredIndicator}
      >
        <Connected left={connectedLeft} right={connectedRight}>
          <div className={className} onClick={handleClick}>
            {prefixMarkup}
            {inputMarkup}
            {suffixMarkup}
            {characterCountMarkup}
            {clearButtonMarkup}
            {spinnerMarkup}
            {backdropMarkup}
            {resizer}
          </div>
        </Connected>
      </Labelled>
    );

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      onChange && onChange(event.currentTarget.value, id);
    }

    function handleClick(event: React.MouseEvent<HTMLInputElement>) {
      const { target } = event;

      // For TextFields used with Combobox, focus needs to be set again even
      // if the TextField is already focused to trigger the logic to open the
      // Combobox activator
      const inputRefRole = inputRef?.current?.getAttribute('role');
      if (target === inputRef.current && inputRefRole === 'combobox') {
        inputRef.current?.focus();
        handleOnFocus(event);
        return;
      }

      if (
        isPrefixOrSuffix(target) ||
        isVerticalContent(target) ||
        isInput(target) ||
        isSpinner(target) ||
        focus
      ) {
        return;
      }

      inputRef.current?.focus();
    }

    function handleClickChild(event: React.MouseEvent) {
      if (!isSpinner(event.target) && !isInput(event.target)) {
        event.stopPropagation();
      }

      if (
        isPrefixOrSuffix(event.target) ||
        isVerticalContent(event.target) ||
        isInput(event.target) ||
        focus
      ) {
        return;
      }

      setFocus(true);
    }

    function handleClearButtonPress() {
      onClearButtonClick && onClearButtonClick(id);
    }

    function handleKeyPress(event: React.KeyboardEvent) {
      const { key, code } = event;
      const numbersSpec = /[\d.eE+-]$/;
      if (type !== 'number' || code === Key.Enter || numbersSpec.test(key)) {
        return;
      }

      event.preventDefault();
    }

    function handleOnBlur(event: React.FocusEvent) {
      setFocus(false);

      if (onBlur) {
        onBlur(event);
      }
    }

    function isInput(target: HTMLElement | EventTarget) {
      return (
        target instanceof HTMLElement &&
        inputRef.current &&
        (inputRef.current.contains(target) ||
          inputRef.current.contains(document.activeElement))
      );
    }

    function isPrefixOrSuffix(target: Element | EventTarget) {
      return (
        target instanceof Element &&
        ((prefixRef.current && prefixRef.current.contains(target)) ||
          (suffixRef.current && suffixRef.current.contains(target)))
      );
    }

    function isSpinner(target: Element | EventTarget) {
      return (
        target instanceof Element &&
        spinnerRef.current &&
        spinnerRef.current.contains(target)
      );
    }

    function isVerticalContent(target: Element | EventTarget) {
      return (
        target instanceof Element &&
        verticalContentRef.current &&
        (verticalContentRef.current.contains(target) ||
          verticalContentRef.current.contains(document.activeElement))
      );
    }
  }
);

function getRows(multiline?: boolean | number) {
  if (!multiline) return undefined;

  return typeof multiline === 'number' ? multiline : 1;
}

function normalizeAriaMultiline(multiline?: boolean | number) {
  if (!multiline) return undefined;

  return Boolean(multiline) || multiline > 0
    ? { 'aria-multiline': true }
    : undefined;
}

import { ChevronUpDown } from '@opub-icons/workflow';
import cx from 'classnames';
import React, { forwardRef, LegacyRef, useId } from 'react';
import {
  HideableStrictOption,
  SelectGroup,
  SelectOption,
  SelectProps,
  StrictGroup,
  StrictOption,
} from '../../types/select';
import { Box } from '../Box';
import { helpTextID, Labelled } from '../Labelled';
import { Text } from '../Text';
import styles from './Select.module.scss';

const PLACEHOLDER_VALUE = '';

export const Select = forwardRef(
  (
    {
      options: optionsProp,
      label,
      labelAction,
      labelHidden: labelHiddenProp,
      labelInline,
      disabled,
      helpText,
      placeholder,
      id: idProp,
      name,
      value = PLACEHOLDER_VALUE,
      error,
      onChange,
      onFocus,
      onBlur,
      requiredIndicator,
    }: SelectProps,
    ref: LegacyRef<HTMLSelectElement>
  ) => {
    const randomId = useId();
    const id = idProp || randomId;
    const labelHidden = labelInline ? true : labelHiddenProp;

    const className = cx(
      styles.Select,
      error && styles.error,
      disabled && styles.disabled
    );

    const handleChange = onChange
      ? (event: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(event.currentTarget.value, id)
      : undefined;

    const describedBy: string[] = [];
    if (helpText) {
      describedBy.push(helpTextID(id));
    }
    if (error) {
      describedBy.push(`${id}Error`);
    }

    const options = optionsProp || [];
    let normalizedOptions = options.map(normalizeOption);

    if (placeholder) {
      normalizedOptions = [
        {
          label: placeholder,
          value: PLACEHOLDER_VALUE,
          disabled: true,
        },
        ...normalizedOptions,
      ];
    }

    const inlineLabelMarkup = labelInline && (
      <Box paddingInlineEnd="1">
        <Text as="span" color="subdued" truncate>
          {label}
        </Text>
      </Box>
    );

    const selectedOption = getSelectedOption(normalizedOptions, value);

    const prefixMarkup = selectedOption.prefix && (
      <div className={styles.Prefix}>{selectedOption.prefix}</div>
    );

    const contentMarkup = (
      <div className={styles.Content} aria-hidden aria-disabled={disabled}>
        {inlineLabelMarkup}
        {prefixMarkup}
        <span className={styles.SelectedOption}>{selectedOption.label}</span>
        <span className={styles.Icon}>
          <ChevronUpDown />
        </span>
      </div>
    );

    const optionsMarkup = normalizedOptions.map(renderOption);

    return (
      <Labelled
        id={id}
        label={label}
        error={error}
        action={labelAction}
        labelHidden={labelHidden}
        helpText={helpText}
        requiredIndicator={requiredIndicator}
      >
        <div className={className}>
          <select
            id={id}
            name={name}
            value={value}
            className={styles.Input}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            aria-invalid={Boolean(error)}
            aria-describedby={
              describedBy.length ? describedBy.join(' ') : undefined
            }
            aria-required={requiredIndicator}
            ref={ref}
          >
            {optionsMarkup}
          </select>
          {contentMarkup}
          <div className={styles.Backdrop} />
        </div>
      </Labelled>
    );
  }
);

function isString(option: SelectOption | SelectGroup): option is string {
  return typeof option === 'string';
}

function isGroup(option: SelectOption | SelectGroup): option is SelectGroup {
  return (
    typeof option === 'object' && 'options' in option && option.options != null
  );
}

function normalizeStringOption(option: string): StrictOption {
  return {
    label: option,
    value: option,
  };
}

/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption(
  option: SelectOption | SelectGroup
): HideableStrictOption | StrictGroup {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    const { title, options } = option;
    return {
      title,
      options: options.map((option) => {
        return isString(option) ? normalizeStringOption(option) : option;
      }),
    };
  }

  return option;
}

/**
 * Gets the text to display in the UI, for the currently selected option
 */
function getSelectedOption(
  options: (HideableStrictOption | StrictGroup)[],
  value: string
): HideableStrictOption {
  const flatOptions = flattenOptions(options);
  let selectedOption = flatOptions.find((option) => value === option.value);

  if (selectedOption === undefined) {
    // Get the first visible option (not the hidden placeholder)
    selectedOption = flatOptions.find((option) => !option.hidden);
  }

  return selectedOption || { value: '', label: '' };
}

/**
 * Ungroups an options array
 */
function flattenOptions(
  options: (HideableStrictOption | StrictGroup)[]
): HideableStrictOption[] {
  let flatOptions: HideableStrictOption[] = [];

  options.forEach((optionOrGroup) => {
    if (isGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(optionOrGroup.options);
    } else {
      flatOptions.push(optionOrGroup);
    }
  });

  return flatOptions;
}

function renderSingleOption(option: HideableStrictOption): React.ReactNode {
  const { value, label, prefix: _prefix, ...rest } = option;
  return (
    <option key={value} value={value} {...rest}>
      {label}
    </option>
  );
}

function renderOption(
  optionOrGroup: HideableStrictOption | StrictGroup
): React.ReactNode {
  if (isGroup(optionOrGroup)) {
    const { title, options } = optionOrGroup;
    return (
      <optgroup label={title} key={title}>
        {options.map(renderSingleOption)}
      </optgroup>
    );
  }

  return renderSingleOption(optionOrGroup);
}

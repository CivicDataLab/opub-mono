import React, {
  forwardRef,
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useState,
  useTransition,
} from 'react';
import {
  Combobox,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxList,
  ComboboxProvider,
  Select as SelectButton,
  SelectGroup as AriakitSelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectItemCheck,
  SelectPopover,
  SelectProvider,
} from '@ariakit/react';
import { IconCheck, IconChevronDown, IconSearch } from '@tabler/icons-react';
import { matchSorter } from 'match-sorter';

import {
  HideableStrictOption,
  SelectGroup,
  SelectOption,
  SelectProps,
  StrictGroup,
  StrictOption,
} from '../../types/select';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import { helpTextID, Labelled } from '../Labelled';
import { Text } from '../Text';
import styles from './Select.module.scss';

const PLACEHOLDER_VALUE = '';

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options: optionsProp,
      label,
      labelAction,
      labelHidden: labelHiddenProp,
      labelInline,
      disabled,
      helpText,
      describedBy: describedByProp,
      placeholder,
      searchable = true,
      searchPlaceholder = 'Search...',
      id: idProp,
      name,
      value,
      error,
      onChange,
      onFocus,
      onBlur,
      defaultValue,
      requiredIndicator,
      className,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [selected, setSelected] = useState(
      value ?? defaultValue ?? PLACEHOLDER_VALUE
    );
    const [searchValue, setSearchValue] = useState('');
    const [, startTransition] = useTransition();
    const deferredValue = useDeferredValue(searchValue);

    useEffect(() => {
      if (isControlled) {
        setSelected(value);
      }
    }, [isControlled, value]);

    const randomId = useId();
    const id = idProp || randomId;
    const labelHidden = labelInline ? true : labelHiddenProp;
    const currentValue = isControlled ? value : selected;

    const classes = cn(
      styles.Select,
      Boolean(error) && styles.error,
      Boolean(disabled) && styles.disabled
    );

    const handleValueChange = useCallback(
      (next: string | string[]) => {
        const nextValue = Array.isArray(next) ? (next[0] ?? '') : next;
        if (!isControlled) {
          setSelected(nextValue);
        }
        onChange?.(nextValue, name);
      },
      [isControlled, name, onChange]
    );

    const describedBy: string[] = [];
    if (helpText) {
      describedBy.push(helpTextID(id));
    }

    if (error) {
      describedBy.push(`${id}Error`);
    }

    if (describedByProp) {
      describedBy.push(describedByProp);
    }

    const options = optionsProp || [];
    const normalizedOptions = useMemo(
      () => options.map(normalizeOption),
      [options]
    );

    const matches = useMemo(
      () => getFilteredOptions(normalizedOptions, searchable ? deferredValue : ''),
      [deferredValue, normalizedOptions, searchable]
    );

    const selectedOption = getSelectedOption(
      normalizedOptions,
      currentValue,
      placeholder
    );
    const isPlaceholder =
      currentValue === PLACEHOLDER_VALUE ||
      selectedOption.value === PLACEHOLDER_VALUE;

    const inlineLabelMarkup = labelInline && (
      <div className="pr-1">
        <Text as="span" color="subdued" truncate>
          {label}
        </Text>
      </div>
    );

    const prefixMarkup = selectedOption.prefix && (
      <div className={styles.Prefix}>{selectedOption.prefix}</div>
    );

    const select = (
      <SelectProvider value={currentValue} setValue={handleValueChange}>
        <Labelled
          id={id}
          label={label}
          error={error}
          action={labelAction}
          labelHidden={labelHidden}
          helpText={helpText}
          requiredIndicator={requiredIndicator}
          className={className}
        >
          <div className={classes}>
            <SelectButton
              id={id}
              ref={ref}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              className={styles.Trigger}
              aria-invalid={Boolean(error)}
              aria-describedby={
                describedBy.length ? describedBy.join(' ') : undefined
              }
              aria-required={requiredIndicator}
            >
              {inlineLabelMarkup}
              {prefixMarkup}
              <Text
                as="span"
                className={cn(
                  styles.SelectedOption,
                  isPlaceholder && styles.Placeholder
                )}
                color={isPlaceholder ? 'subdued' : undefined}
              >
                {selectedOption.label}
              </Text>
              <span className={styles.Icon}>
                <Icon source={IconChevronDown} color="default" />
              </span>
            </SelectButton>
            <div className={styles.Backdrop} />
            {name ? (
              <input
                type="hidden"
                name={name}
                value={currentValue}
                disabled={disabled}
              />
            ) : null}
          </div>
        </Labelled>
        <SelectPopover
          gutter={4}
          sameWidth
          className={styles.Popover}
          aria-label={typeof label === 'string' ? label : 'Options'}
        >
          {searchable ? (
            <div className={styles.Search}>
              <span className={styles.SearchIcon} aria-hidden="true">
                <Icon source={IconSearch} color="subdued" />
              </span>
              <Combobox
                autoSelect
                placeholder={searchPlaceholder}
                className={styles.SearchInput}
              />
            </div>
          ) : null}
          {matches.length > 0 ? (
            searchable ? (
              <ComboboxList className={styles.List}>
                {matches.map((option) => renderOption(option, searchable))}
              </ComboboxList>
            ) : (
              <div className={styles.List}>
                {matches.map((option) => renderOption(option, searchable))}
              </div>
            )
          ) : (
            <div className={styles.NoResult}>No results found</div>
          )}
        </SelectPopover>
      </SelectProvider>
    );

    if (!searchable) {
      return select;
    }

    return (
      <ComboboxProvider
        resetValueOnHide
        includesBaseElement={false}
        setValue={(next) => {
          startTransition(() => {
            setSearchValue(next);
          });
        }}
      >
        {select}
      </ComboboxProvider>
    );
  }
);

Select.displayName = 'Select';

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

function normalizeOption(
  option: SelectOption | SelectGroup
): HideableStrictOption | StrictGroup {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    const { title, options } = option;
    return {
      title,
      options: options.map((item) => {
        return isString(item) ? normalizeStringOption(item) : item;
      }),
    };
  }

  return option;
}

function getSelectedOption(
  options: (HideableStrictOption | StrictGroup)[],
  selected: string,
  placeholder?: string
): HideableStrictOption {
  const flatOptions = flattenOptions(options);
  const selectedOption = flatOptions.find((option) => selected === option.value);

  if (selectedOption) {
    return selectedOption;
  }

  if (placeholder) {
    return { value: PLACEHOLDER_VALUE, label: placeholder };
  }

  return flatOptions.find((option) => !option.hidden) || { value: '', label: '' };
}

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

function getFilteredOptions(
  options: (HideableStrictOption | StrictGroup)[],
  query: string
): (HideableStrictOption | StrictGroup)[] {
  const filterItems = (items: StrictOption[]) => {
    const visible = items.filter(
      (item) => !(item as HideableStrictOption).hidden
    );
    if (!query.trim()) {
      return visible;
    }

    return matchSorter(visible, query, { keys: ['label', 'value'] });
  };

  return options.reduce<(HideableStrictOption | StrictGroup)[]>(
    (acc, option) => {
      if (isGroup(option)) {
        const nextOptions = filterItems(option.options);
        if (nextOptions.length > 0) {
          acc.push({ ...option, options: nextOptions });
        }
      } else if (!option.hidden) {
        if (filterItems([option]).length > 0) {
          acc.push(option);
        }
      }
      return acc;
    },
    []
  );
}

function renderSingleOption(
  option: HideableStrictOption,
  searchable: boolean
): React.ReactNode {
  const { value, label, prefix: _prefix, hidden: _hidden, ...rest } = option;

  return (
    <SelectItem
      key={value}
      value={value}
      className={styles.Item}
      focusOnHover
      render={searchable ? <ComboboxItem /> : undefined}
      {...rest}
    >
      <span className={styles.ItemLabel}>
        <Text as="span">{label}</Text>
      </span>
      <SelectItemCheck className={styles.Check} aria-hidden="true">
        <Icon source={IconCheck} color="interactive" />
      </SelectItemCheck>
    </SelectItem>
  );
}

function renderOption(
  optionOrGroup: HideableStrictOption | StrictGroup,
  searchable: boolean
): React.ReactNode {
  if (isGroup(optionOrGroup)) {
    const { title, options } = optionOrGroup;
    const Group = searchable ? ComboboxGroup : AriakitSelectGroup;
    const GroupLabel = searchable ? ComboboxGroupLabel : SelectGroupLabel;

    return (
      <Group key={title} className={styles.Group}>
        <GroupLabel className={styles.GroupLabel}>{title}</GroupLabel>
        {options.map((option) => renderSingleOption(option, searchable))}
      </Group>
    );
  }

  return renderSingleOption(optionOrGroup, searchable);
}

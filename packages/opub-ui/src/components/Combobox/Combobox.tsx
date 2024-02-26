import React, { useMemo, useState, useTransition } from 'react';
import {
  ComboboxItem,
  ComboboxPopover,
  ComboboxProvider,
  useComboboxStore,
} from '@ariakit/react';
import { matchSorter } from 'match-sorter';

import { ComboboxProps } from '../../types/combobox';
import itemStyles from '../ActionList/ActionList.module.scss';
import { Tag } from '../Tag';
import { Text } from '../Text';
import { Combobox as Component } from './Atoms';
import styles from './Combobox.module.scss';

export function Combobox(
  props: ComboboxProps & {
    /**
     * list of the combobox.
     */
    list: {
      value: string;
      label: string;
    }[];
  }
) {
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState('');
  const [selectedValues, setSelectedValues] = useState(props.selectedValue);
  const combobox = useComboboxStore();

  const matches = useMemo(() => {
    return matchSorter(props.list, searchValue, { keys: ['label', 'value'] });
  }, [searchValue]);

  function removeTag(value: string) {
    if (selectedValues && typeof selectedValues !== 'string') {
      const finalArr = selectedValues.filter((v: string) => v !== value);
      setSelectedValues(finalArr);
      props.onChange && props.onChange(finalArr);
    }
  }

  const tags = props.displaySelected ? (
    selectedValues &&
    typeof selectedValues !== 'string' &&
    selectedValues.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {selectedValues.map((tag: string) => (
          <Tag onRemove={removeTag} value={tag} key={tag}>
            {tag}
          </Tag>
        ))}
      </div>
    ) : (
      <div className=" min-h-7">
        <Text variant="bodySm" color="subdued">
          No Tags selected
        </Text>
      </div>
    )
  ) : null;

  return (
    <ComboboxProvider
      selectedValue={selectedValues}
      setSelectedValue={(e) => {
        setSelectedValues(e);
        props.onChange && props.onChange(e);
      }}
      setValue={(value) => {
        startTransition(() => {
          setSearchValue(value);
        });
      }}
      store={combobox}
    >
      <Component
        label={props.label}
        labelHidden={props.labelHidden}
        error={props.error}
        placeholder={props.placeholder}
        id={props.id}
        verticalContent={
          props.displaySelected && typeof selectedValues !== 'string' && tags
        }
      />
      <ComboboxPopover
        sameWidth
        gutter={8}
        aria-busy={isPending}
        className={styles.Popover}
        style={{ '--popover-padding': 'var(--space-1)' } as React.CSSProperties}
      >
        {matches.map((item) => (
          <ComboboxItem
            key={item.value}
            value={item.value}
            focusOnHover
            className={itemStyles.Item}
          >
            {item.label}
          </ComboboxItem>
        ))}
        {!matches.length && (
          <div className={styles.NoResult}>No results found</div>
        )}
      </ComboboxPopover>
    </ComboboxProvider>
  );
}

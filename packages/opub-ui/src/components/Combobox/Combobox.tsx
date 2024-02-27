import React, { useMemo, useState, useTransition } from 'react';
import {
  ComboboxGroup,
  ComboboxItem,
  ComboboxPopover,
  ComboboxProvider,
  useComboboxStore,
} from '@ariakit/react';
import { matchSorter } from 'match-sorter';

import type { ComboboxProps, TListItem } from '../../types/combobox';
import itemStyles from '../ActionList/ActionList.module.scss';
import { Divider } from '../Divider';
import { Tag } from '../Tag';
import { Text } from '../Text';
import { Combobox as Component } from './Atoms';
import styles from './Combobox.module.scss';

const groupBy = function (arr: any[], criteria: string) {
  return arr.reduce(function (obj, item) {
    var key = item[criteria];
    // If the key doesn't exist yet, create it
    if (!Object.prototype.hasOwnProperty.call(obj, key)) obj[key] = [];
    // Push the value to the object
    obj[key].push(item);

    return obj;
  }, {});
};

export const Combobox = React.forwardRef(
  (
    props: ComboboxProps & {
      /**
       * list of the combobox.
       */
      list: TListItem[];

      /**
       * Add grouping to the combobox.
       */
      group?: boolean;
    },
    _
  ) => {
    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState('');
    const deferredValue = React.useDeferredValue(searchValue);
    const [selectedValues, setSelectedValues] = useState<
      TListItem[] | string | undefined
    >(props.selectedValue);

    const combobox = useComboboxStore();

    const matches = useMemo(() => {
      const items = matchSorter(props.list, deferredValue, {
        keys: ['label', 'value'],
      });
      if (props.group) return Object.entries(groupBy(items, 'type'));
      return items;
    }, [deferredValue]);

    function removeTag(value: string) {
      if (selectedValues && typeof selectedValues !== 'string') {
        const finalArr = selectedValues.filter(
          (v: { value: string; label: string }) => v.value !== value
        );
        setSelectedValues(finalArr);
        props.onChange && props.onChange(finalArr);
      }
    }

    let tags = null;
    if (
      props.displaySelected &&
      selectedValues &&
      typeof selectedValues !== 'string'
    ) {
      tags =
        selectedValues.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedValues.map((tag) => (
              <Tag
                onRemove={() => removeTag(tag.value)}
                value={tag.value}
                key={tag.value}
              >
                {tag.label}
              </Tag>
            ))}
          </div>
        ) : (
          <div className=" min-h-7">
            <Text variant="bodySm" color="subdued">
              No Tags selected
            </Text>
          </div>
        );
    }

    let selected: any = selectedValues;
    if (Array.isArray(selectedValues)) {
      selected = selectedValues.map((value) => value.value);
    }

    return (
      <ComboboxProvider
        selectedValue={selected}
        setSelectedValue={(e) => {
          // for single select
          if (typeof e === 'string') {
            setSelectedValues(e);
            props.onChange && props.onChange(e);
            return;
          }

          // for multi select
          const selectedArr = e.map((value: string) => {
            return props.list.find((item) => item.value === value);
          });
          setSelectedValues(selectedArr);
          props.onChange && props.onChange(selectedArr);
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
          style={
            { '--popover-padding': 'var(--space-1)' } as React.CSSProperties
          }
        >
          {matches.length > 0 ? (
            <div className={styles.List}>
              {props.group ? (
                <ListGroup matches={matches} />
              ) : (
                <List matches={matches} />
              )}
            </div>
          ) : (
            <div className={styles.NoResult}>No results found</div>
          )}
        </ComboboxPopover>
      </ComboboxProvider>
    );
  }
);

const List = ({ matches }: { matches: any }) => {
  return (
    <>
      {matches.map((item: TListItem) => (
        <Item key={item.value} item={item} />
      ))}
    </>
  );
};

const ListGroup = ({ matches }: { matches: any }) => {
  return (
    <>
      {matches.map(([type, items]: [string, TListItem[]], i: number) => (
        <React.Fragment key={type}>
          {/* @ts-expect-error */}
          <ComboboxGroup label={type}>
            <div aria-hidden="true" className="pl-2">
              <Text variant="bodySm" color="disabled" fontWeight="medium">
                {type}
              </Text>
            </div>
            {items.map((item) => (
              <Item key={item.value} item={item} />
            ))}
          </ComboboxGroup>
          {i < matches.length - 1 && <Divider className="my-1" />}
        </React.Fragment>
      ))}
    </>
  );
};

const Item = ({ item }: { item: TListItem }) => {
  return (
    <ComboboxItem
      value={item.value}
      className={itemStyles.Item}
      disabled={item.disabled}
      focusOnHover
    >
      <Text color={item.disabled ? 'disabled' : 'default'}>{item.label}</Text>
    </ComboboxItem>
  );
};

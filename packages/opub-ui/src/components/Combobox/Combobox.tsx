import React, { SetStateAction, useMemo, useState, useTransition } from 'react';
import {
  ComboboxGroup,
  ComboboxItem,
  ComboboxPopover,
  ComboboxProvider,
  useComboboxStore,
} from '@ariakit/react';
import { matchSorter } from 'match-sorter';

import type { ComboboxProps, TListItem } from '../../types/combobox';
import { groupBy } from '../../utils';
import itemStyles from '../ActionList/ActionList.module.scss';
import { Divider } from '../Divider';
import { Tag } from '../Tag';
import { Text } from '../Text';
import { Combobox as ComboboxComponent } from './Atoms';
import styles from './Combobox.module.scss';

export type ComboProps = {
  /**
   * list of the combobox.
   */
  list: TListItem[];

  /**
   * Add grouping to the combobox.
   */
  group?: boolean;

  /**
   * Add creatable to the combobox.
   */
  creatable?: boolean;

  onInput?: (value: string) => void; // Add this line
};

export const Combobox = React.forwardRef(
  (props: ComboboxProps & ComboProps, _) => {
    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState('');
    const deferredValue = React.useDeferredValue(searchValue);
    const [selectedValues, setSelectedValues] = useState(props.selectedValue);
    const [comboboxList, setComboboxList] = useState(props.list);

    const combobox = useComboboxStore();
    const ref = React.useRef(null);

    React.useEffect(() => {
      setSelectedValues(props.selectedValue);

      if (
        typeof props.selectedValue === 'string' ||
        props.selectedValue === undefined
      ) {
        combobox.setValue(
          props.selectedValue || ('' as SetStateAction<string>)
        );
      }
    }, [props.selectedValue]);

    React.useEffect(() => {
      // change the anchor element of the combobox to get proper width
      if (ref?.current) {
        combobox.setAnchorElement(ref.current);
      }
    }, [ref?.current, combobox.getState().selectedValue]);

    function keyHander(e: { key: string }) {
      const { selectedValue, value } = combobox.getState();

      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (
          value === '' &&
          selectedValue &&
          Array.isArray(selectedValue) &&
          selectedValue.length > 0
        ) {
          setSelectedValues((arr: any) => {
            const newArr = [...arr].slice(0, -1);
            props.onChange && props.onChange(newArr);
            return newArr;
          });
          combobox.getState().baseElement?.focus();
        }
      }

      if (e.key === 'Escape') {
        combobox.hide();
      }
    }

    React.useEffect(() => {
      const { baseElement } = combobox.getState();

      // add keyboard event listener to remove the last tag
      baseElement?.addEventListener('keydown', keyHander);

      return () => {
        baseElement?.removeEventListener('keydown', keyHander);
      };
    }, [combobox.getState().baseElement]);

    const matches = useMemo(() => {
      if (props.group) {
        const items = matchSorter(comboboxList, deferredValue, {
          keys: ['label', 'value', 'type'],
        });

        return Object.entries(groupBy(items, 'type'));
      }

      return matchSorter(comboboxList, deferredValue, {
        keys: ['label', 'value'],
      });
    }, [deferredValue, comboboxList, props.selectedValue]);

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
          <>
            {selectedValues.map((tag) => (
              <Tag
                onRemove={() => removeTag(tag.value)}
                value={tag.value}
                key={tag.value}
              >
                {tag.label}
              </Tag>
            ))}
          </>
        ) : null;
    }

    let selected: any = selectedValues;
    if (Array.isArray(selectedValues)) {
      selected = selectedValues.map((value) => value.value);
    }

    return (
      <ComboboxProvider
        setOpen={(e) => {
          if (e) {
            setTimeout(() => {
              combobox.getState().baseElement?.focus();

              if (ref.current) {
                const buttonElm: any = (
                  ref.current as HTMLDivElement
                ).querySelector('[data-opened]');

                combobox.setDisclosureElement(buttonElm);
              }
            }, 10);
          }
        }}
        selectedValue={selected}
        setSelectedValue={(e) => {
          // for single select
          if (typeof e === 'string') {
            if (comboboxList.findIndex((it) => it.value === e) < 0) {
              setSelectedValues(e);
              setComboboxList([
                ...comboboxList,
                {
                  label: e,
                  value: e,
                },
              ]);
            } else {
              setSelectedValues(e);
            }

            // Clear inputbox
            combobox.setValue('');
            setSearchValue('');

            props.onChange && props.onChange(e);
            return;
          }

          // for multi select
          const selectedArr = e.map((value: string) => {
            return (
              comboboxList.find((item) => item.value === value) || {
                label: value,
                value: value,
              }
            );
          });
          setSelectedValues(selectedArr);

          // Clear inputbox
          combobox.setValue('');
          setSearchValue('');

          props.onChange && props.onChange(selectedArr);
        }}
        setValue={(value) => {
          startTransition(() => {
            setSearchValue(value);
            if (props.onInput) {
              props.onInput(value);
            }
          });
        }}
        store={combobox}
      >
        <ComboboxComponent
          ref={ref}
          label={props.label}
          labelHidden={props.labelHidden}
          error={props.error}
          placeholder={props.placeholder}
          id={props.id}
          combobox={combobox}
          tags={
            props.displaySelected && typeof selectedValues !== 'string' && tags
          }
        />
        <ComboboxPopover
          sameWidth
          store={combobox}
          gutter={8}
          aria-busy={isPending}
          className={styles.Popover}
          style={
            { '--popover-padding': 'var(--space-1)' } as React.CSSProperties
          }
        >
          {props.creatable === true && searchValue.trim().length > 0 && (
            <>
              <Item
                item={{
                  value: searchValue,
                  label: `Create ${searchValue}`,
                }}
              />
            </>
          )}
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
  const id = React.useId();

  // sorting items witout type first
  matches.sort((a: any, b: any) => {
    if (a[0] === 'undefined') return -1;
    if (b[0] === 'undefined') return 1;
    return 0;
  });

  return (
    <>
      {matches.map(([type, items]: [string, TListItem[]], i: number) => (
        <React.Fragment key={type}>
          <ComboboxGroup aria-labelledby={id}>
            <div aria-hidden="true" id={id} className="pl-2">
              <Text
                variant="bodySm"
                color="disabled"
                visuallyHidden={type === 'undefined'}
                fontWeight="medium"
              >
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

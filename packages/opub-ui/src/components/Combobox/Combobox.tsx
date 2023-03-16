import cx from 'classnames';
import { useCombobox, useMultipleSelection } from 'downshift';
import React from 'react';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { Label } from '../Label';
import { Tag } from '../Tag';
import styles from './Combobox.module.scss';

function comboboxFilter(
  selectedItems: string | any[],
  inputValue: string,
  items: any[]
) {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return items.filter(function filterBook(item) {
    return (
      !selectedItems.includes(item) &&
      item.label.toLowerCase().includes(lowerCasedInputValue)
    );
  });
}

interface Props {
  allItems: {
    label: string;
    value: string;
  }[];

  initialSelectedItems: {
    label: string;
    value: string;
  }[];

  label?: string;
}

export function Combobox({ allItems, initialSelectedItems, label }: Props) {
  const [inputValue, setInputValue] = React.useState<any>('');
  const [selectedItems, setSelectedItems] =
    React.useState<any>(initialSelectedItems);

  const items: {
    label: string;
    value: string;
  }[] = React.useMemo(
    () => comboboxFilter(selectedItems, inputValue, allItems),
    [selectedItems, inputValue, allItems]
  );

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems,
      onStateChange({ selectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            setSelectedItems(selectedItems);
            break;
          default:
            break;
        }
      },
    });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items,
    itemToString(item: any) {
      return item ? item.label : '';
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
            highlightedIndex: 0, // with the first option highlighted.
          };
        default:
          return changes;
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            setSelectedItems([...selectedItems, newSelectedItem]);
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue);

          break;
        default:
          break;
      }
    },
  });

  const verticalContentMarkup =
    selectedItems.length > 0 ? (
      <Flex gap={4}>
        {selectedItems.map((tag: any, index: number) => (
          <Tag
            key={tag.value}
            {...getSelectedItemProps({
              selectedItem: tag,
              index,
            })}
            onRemove={() => {
              removeSelectedItem(tag);
            }}
          >
            {tag.label}
          </Tag>
        ))}
      </Flex>
    ) : null;

  return (
    <div>
      <div>
        <Label {...getLabelProps()}>{label}</Label>
        <div>
          <div>
            {verticalContentMarkup}
            <input
              placeholder="Best book ever"
              className="w-full"
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
            {/* <Input
              placeholder="Best book ever"
              verticalContent={verticalContentMarkup}
              label=""
              {...getInputProps(
                getDropdownProps({
                  preventKeyAction: isOpen,
                  // refKey: 'inputRef',
                })
              )}
            /> */}
          </div>
        </div>
      </div>

      <ul {...getMenuProps()}>
        {isOpen &&
          items.map((item: any, index: number) => (
            <li
              className={cx(
                styles.Item,
                highlightedIndex === index && styles['Item--Highlighted'],
                selectedItem === item && styles['Item--Selected']
              )}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.label}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

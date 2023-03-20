import cx from 'classnames';
import { useCombobox, useMultipleSelection } from 'downshift';
import React from 'react';
import { Flex } from '../../Flex';
import { Label } from '../../Label';
import { Tag } from '../../Tag';
import { ComboboxProps } from '../Combobox';
import styles from '../Combobox.module.scss';
import { Input, List } from './Atoms';
import { Portal } from 'react-portal';

function comboboxFilter(
  selectedItems: string | any[],
  inputValue: string,
  items: any[]
) {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return items.filter(function filter(item) {
    return (
      !selectedItems.includes(item) &&
      item.label.toLowerCase().includes(lowerCasedInputValue)
    );
  });
}

export function MultiSelect({
  allItems,
  initialSelectedItems,
  label,
}: Omit<ComboboxProps, 'allowMultiple'>) {
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
            <Input
              placeholder="Best book ever"
              className="w-full"
              getInputProps={getInputProps}
            />
          </div>
        </div>
      </div>

      <Portal>
        <List
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          isOpen={isOpen}
          items={items}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      </Portal>
    </div>
  );
}

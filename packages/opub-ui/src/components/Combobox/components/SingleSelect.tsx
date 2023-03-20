import { Label } from '@ui/components/Label';
import cx from 'classnames';
import { useCombobox } from 'downshift';
import React from 'react';
import { ComboboxProps } from '../Combobox';
import styles from '../Combobox.module.scss';
import { Input, List } from './Atoms';

function comboboxFilter(inputValue: string) {
  const lowerCasedInputValue = inputValue.toLowerCase();
  return function filter(item: { label: string }) {
    return (
      !inputValue || item.label.toLowerCase().includes(lowerCasedInputValue)
    );
  };
}

export function SingleSelect({
  allItems,
  label,
}: Omit<ComboboxProps, 'allowMultiple' | 'initialSelectedItems'>) {
  const [items, setItems] = React.useState(allItems);
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
    onInputValueChange({ inputValue }: any) {
      setItems(allItems.filter(comboboxFilter(inputValue)));
    },
    items,
    itemToString(item) {
      return item ? item.label : '';
    },
  });

  return (
    <div>
      <div>
        {label && <Label {...getLabelProps()}>{label}</Label>}
        <div>
          <Input
            placeholder="Best book ever"
            className="w-full"
            getInputProps={getInputProps}
          />
        </div>
      </div>

      <List
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        isOpen={isOpen}
        items={items}
        highlightedIndex={highlightedIndex}
        selectedItem={selectedItem}
      />
    </div>
  );
}

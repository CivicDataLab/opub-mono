import { ComboboxSingleProps } from '@ui/types/combobox';
import {
  ComboboxItem,
  ComboboxPopover,
  useComboboxState,
} from 'ariakit/combobox';
import { Portal } from 'ariakit/portal';
import { SelectItem, SelectList, useSelectState } from 'ariakit/select';
import cx from 'classnames';
import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import itemStyles from '../../ActionList/ActionList.module.scss';
import styles from '../Combobox.module.scss';
import { Combobox } from './Atoms';

export type ComboboxProps = ComboboxSingleProps & {
  defaultValues?: string[];
  values?: string[];
  onValuesChange?: (values: string[]) => void;
};

export const MultiSelect = forwardRef<HTMLInputElement, ComboboxProps>(
  (props: ComboboxProps, ref) => {
    const [matches, setMatches] = useState<string[]>([]);
    const [values, setValues] = useState<string[]>(['Banana']);

    const {
      defaultValue,
      value,
      onChange,
      defaultValues,
      onValuesChange,
      defaultList,
      list,
      onFilter,
      ...comboboxProps
    } = props;

    function handleValuesChange(values: string[]) {
      setValues(values);
      onValuesChange?.(values);
    }

    const combobox = useComboboxState({
      // VoiceOver has issues with multi-selectable comboboxes where the DOM focus
      // is on the combobox input, so we set `virtualFocus` to `false` to disable
      // this behavior and put DOM focus on the items.
      virtualFocus: false,
      sameWidth: true,
      gutter: 8,
      defaultValue,
      value,
      setValue: onChange,
      defaultList,
      list,
    });
    const select = useSelectState({
      ...combobox,
      defaultValue: defaultValues,
      value: values,
      setValue: handleValuesChange,
    });

    useEffect(() => {
      setMatches(combobox.matches);
      onFilter?.(combobox.matches);
    }, [combobox.matches]);

    // Reset the combobox value whenever an item is checked or unchecked.
    useEffect(() => {
      combobox.setValue('');
    }, [select.value, combobox.setValue]);

    return (
      <div className="opub-combobox-multi">
        <Combobox combobox={combobox} ref={ref} {...comboboxProps} />

        <Portal>
          <ComboboxPopover state={combobox} className={styles.Popover}>
            {(popoverProps) => (
              <SelectList
                state={select}
                // Disable the composite & typeahead behavior on the select list since combobox
                // will handle it.
                composite={false}
                typeahead={false}
                {...popoverProps}
              >
                {matches.length ? (
                  matches.map((value) => (
                    <ComboboxMultipleItem key={value} value={value} />
                  ))
                ) : (
                  <div className={styles.NoResult}>No results found</div>
                )}
              </SelectList>
            )}
          </ComboboxPopover>
        </Portal>
      </div>
    );
  }
);

export type ComboboxMultipleItemProps = HTMLAttributes<HTMLDivElement> & {
  value?: string;
};

export const ComboboxMultipleItem = forwardRef<
  HTMLDivElement,
  ComboboxMultipleItemProps
>(({ value, ...props }, ref) => {
  const className = cx(
    itemStyles.Item
    // props.disabled && styles.disabled,
  );

  return (
    <SelectItem
      ref={ref}
      value={value}
      shouldRegisterItem={false}
      className={className}
      {...props}
    >
      {(itemProps) => <ComboboxItem {...itemProps}>{value}</ComboboxItem>}
    </SelectItem>
  );
});

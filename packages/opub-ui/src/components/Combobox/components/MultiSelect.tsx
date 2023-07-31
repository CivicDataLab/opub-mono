'use client';

import { LabelledProps } from '../../../types';
import { ComboboxSingleProps } from '../../../types/combobox';
import { cn } from '../../../utils';
import itemStyles from '../../ActionList/ActionList.module.scss';
import { Box } from '../../Box';
import { Tag } from '../../Tag';
import { Text } from '../../Text';
import styles from '../Combobox.module.scss';
import { Combobox } from './Atoms';
import {
  ComboboxItem,
  ComboboxPopover,
  useComboboxState,
} from 'ariakit/combobox';
import { Portal } from 'ariakit/portal';
import { SelectItem, SelectList, useSelectState } from 'ariakit/select';
import cx from 'classnames';
import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';

export type ComboboxMultiProps = ComboboxSingleProps & {
  defaultValues?: string[] | (() => string[]);
  values?: string[];
  onValuesChange?: any;
  list?: string[];
  error?: boolean | string | React.ReactNode;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Visual required indicator, add an asterisk to label */
  requiredIndicator?: boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Additional class names to apply */
  className?: string;
};

export const MultiSelect = forwardRef<HTMLInputElement, ComboboxMultiProps>(
  (props: ComboboxMultiProps, ref) => {
    const [matches, setMatches] = useState<string[]>([]);
    const [values, setValues] = useState<any>(
      props.values || props.defaultValues || []
    );

    const {
      defaultValue,
      value,
      onChange,
      defaultValues,
      onValuesChange,
      defaultList,
      list,
      onFilter,
      verticalContent,
      error,
      className,
      ...comboboxProps
    } = props;

    function handleValuesChange(values: any) {
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
      setValue: onChange,
      defaultList,
      list,
    });

    const select: any = useSelectState({
      ...combobox,
      defaultValue: defaultValue,
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

    function removeTag(value: string) {
      const finalArr = select.value.filter((v: string) => v !== value);
      select.setValue(finalArr);
    }

    const tags = verticalContent ? (
      values.length > 0 ? (
        <Box flex gap="1" wrap>
          {values.map((tag: string) => (
            <Tag onRemove={removeTag} value={tag} key={tag}>
              {tag}
            </Tag>
          ))}
        </Box>
      ) : (
        <Box minHeight="28px">
          <Text variant="bodySm" color="subdued">
            No Tags selected
          </Text>
        </Box>
      )
    ) : null;

    return (
      <div className={cn(styles.Wrapper, className)}>
        <Combobox
          combobox={combobox}
          ref={ref}
          verticalContent={tags}
          error={error}
          {...comboboxProps}
        />

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
  const className = cx(itemStyles.Item);

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

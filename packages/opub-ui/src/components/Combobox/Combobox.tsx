import styles from './Combobox.module.scss';
import cx from 'classnames';

import React, { useState, useCallback, useMemo, Children, useRef } from 'react';

// import { Popover, PopoverPublicAPI } from '../Popover';
// import type { PopoverProps } from '../Popover';
import type { TextFieldProps } from '@ui/types/input';
import type { ListboxProps } from '../Listbox';
import {
  ComboboxTextFieldContext,
  ComboboxTextFieldType,
  ComboboxListboxContext,
  ComboboxListboxType,
  ComboboxListboxOptionType,
  ComboboxListboxOptionContext,
} from './utils';

import { TextField } from './components';
import { Popover } from '../Popover';
import { Content, Trigger } from '../Popover/Popover';

export interface ComboboxProps {
  /** The text field component to activate the Popover */
  activator: React.ReactElement<TextFieldProps>;
  /** Allows more than one option to be selected */
  allowMultiple?: boolean;
  /** The content to display inside the popover */
  children?: React.ReactElement<ListboxProps> | null;
  /** The preferred direction to open the popover */
  preferredPosition?: 'above' | 'below' | 'mostSpace';
  /** Whether or not more options are available to lazy load when the bottom of the listbox reached. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
  willLoadMoreOptions?: boolean;
  /** Height to set on the Popover Pane. */
  height?: string;
  /** Callback fired when the bottom of the lisbox is reached. Use to lazy load when listbox option data is paginated. */
  onScrolledToBottom?(): void;
  /** Callback fired when the popover closes */
  onClose?(): void;
}
export interface PopoverPublicAPI {
  forceUpdatePosition(): void;
}

export function Combobox({
  activator,
  allowMultiple,
  children,
  preferredPosition = 'below',
  willLoadMoreOptions,
  height,
  onScrolledToBottom,
  onClose,
}: ComboboxProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string>();
  const [textFieldLabelId, setTextFieldLabelId] = useState<string>();
  const [listboxId, setListboxId] = useState<string>();
  const [textFieldFocused, setTextFieldFocused] = useState<boolean>(false);
  const shouldOpen = Boolean(!popoverActive && Children.count(children) > 0);
  const ref = useRef<PopoverPublicAPI | null>(null);

  const handleClose = useCallback(() => {
    setPopoverActive(false);
    onClose?.();

    setActiveOptionId(undefined);
  }, [onClose]);

  const handleOpen = useCallback(() => {
    setPopoverActive(true);
    setActiveOptionId(undefined);
  }, []);

  const onOptionSelected = useCallback(() => {
    if (!allowMultiple) {
      handleClose();
      setActiveOptionId(undefined);
      return;
    }

    ref.current?.forceUpdatePosition();
  }, [allowMultiple, handleClose]);

  const handleFocus = useCallback(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);

  const handleChange = useCallback(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);

  const handleBlur = useCallback(() => {
    if (popoverActive) {
      handleClose();
    }
  }, [popoverActive, handleClose]);

  const textFieldContextValue: ComboboxTextFieldType = useMemo(
    () => ({
      activeOptionId,
      expanded: popoverActive,
      listboxId,
      setTextFieldFocused,
      setTextFieldLabelId,
      onTextFieldFocus: handleFocus,
      onTextFieldChange: handleChange,
      onTextFieldBlur: handleBlur,
    }),
    [
      activeOptionId,
      popoverActive,
      listboxId,
      setTextFieldFocused,
      setTextFieldLabelId,
      handleFocus,
      handleChange,
      handleBlur,
    ]
  );

  const listboxOptionContextValue: ComboboxListboxOptionType = useMemo(
    () => ({
      allowMultiple,
    }),
    [allowMultiple]
  );

  const listboxContextValue: ComboboxListboxType = useMemo(
    () => ({
      listboxId,
      textFieldLabelId,
      textFieldFocused,
      willLoadMoreOptions,
      onOptionSelected,
      setActiveOptionId,
      setListboxId,
      onKeyToBottom: onScrolledToBottom,
    }),
    [
      listboxId,
      textFieldLabelId,
      textFieldFocused,
      willLoadMoreOptions,
      onOptionSelected,
      setActiveOptionId,
      setListboxId,
      onScrolledToBottom,
    ]
  );
  console.log(popoverActive + ' 1111');

  return (
    <Popover
      // ref={ref}
      open={popoverActive}
      // activator={
      //   <ComboboxTextFieldContext.Provider value={textFieldContextValue}>
      //     {activator}
      //   </ComboboxTextFieldContext.Provider>
      // }
      // autofocusTarget="none"
      // preventFocusOnClose
      // fullWidth
      // preferInputActivator={false}
      // preferredPosition={preferredPosition}
      onOpenChange={popoverActive ? handleOpen : handleClose}
    >
      <Trigger>
        <ComboboxTextFieldContext.Provider value={textFieldContextValue}>
          {activator}
        </ComboboxTextFieldContext.Provider>
      </Trigger>

      <Content>
        {Children.count(children) > 0 ? (
          <ComboboxListboxContext.Provider value={listboxContextValue}>
            <ComboboxListboxOptionContext.Provider
              value={listboxOptionContextValue}
            >
              <div className={styles.Listbox}>{children}</div>
            </ComboboxListboxOptionContext.Provider>
          </ComboboxListboxContext.Provider>
        ) : null}
      </Content>
    </Popover>
  );
}

Combobox.TextField = TextField;

import React, { useMemo, useCallback, useEffect, useId } from 'react';
import type { TextFieldProps } from '@ui/types/input';
import { useComboboxTextField } from '../../utils';
import { Input } from '@ui/components/Input';

export function TextField({
  value,
  id: idProp,
  type = 'text',
  ariaAutocomplete = 'list',
  onFocus,
  onBlur,
  onChange,
  ...rest
}: TextFieldProps) {
  const comboboxTextFieldContext = useComboboxTextField();

  const {
    activeOptionId,
    listboxId,
    expanded,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus,
    onTextFieldChange,
    onTextFieldBlur,
  } = comboboxTextFieldContext;

  const uniqueId = useId();
  const textFieldId = useMemo(() => idProp || uniqueId, [uniqueId, idProp]);

  const labelId = useMemo(
    () => `${idProp || uniqueId}-label`,
    [uniqueId, idProp]
  );

  useEffect(() => {
    if (setTextFieldLabelId) setTextFieldLabelId(labelId);
  }, [labelId, setTextFieldLabelId]);

  const handleFocus = useCallback(
    (event: React.FocusEvent) => {
      if (onFocus) onFocus(event);
      if (onTextFieldFocus) onTextFieldFocus();
      if (setTextFieldFocused) setTextFieldFocused(true);
    },
    [onFocus, onTextFieldFocus, setTextFieldFocused]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent) => {
      if (onBlur) onBlur(event);
      if (onTextFieldBlur) onTextFieldBlur();
      if (setTextFieldFocused) setTextFieldFocused(false);
    },
    [onBlur, onTextFieldBlur, setTextFieldFocused]
  );

  const handleChange = useCallback(
    (value: string, id: string) => {
      if (onChange) onChange(value, id);
      if (onTextFieldChange) onTextFieldChange(value);
    },
    [onChange, onTextFieldChange]
  );

  return (
    <Input
      {...rest}
      value={value}
      id={textFieldId}
      type={type}
      ariaAutocomplete={ariaAutocomplete}
      aria-haspopup="listbox"
      ariaActiveDescendant={activeOptionId}
      ariaControls={listboxId}
      role="combobox"
      ariaExpanded={expanded}
      // @ts-ignore
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}

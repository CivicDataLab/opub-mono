'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { ComboboxProps } from '../../../types';
import { Combobox as ComboboxBase } from '../../Combobox';

type Props = {
  name: string;
  onChange?: (val: string, name: string) => void;
  required?: boolean;
  /**
   * list of the combobox.
   */
  list: {
    value: string;
    label: string;
    type?: string;
    disabled?: boolean;
  }[];
} & Omit<ComboboxProps, 'onChange'>;

const Combobox = ({ required, error, ...props }: Props) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        rules={{ required }}
        render={({ field, fieldState }) => {
          return (
            <ComboboxBase
              {...field}
              {...props}
              error={fieldState.invalid ? error : undefined}
              selectedValue={field.value || props.selectedValue}
              onChange={(value: any) => {
                props.onChange && props.onChange(value, props.name);
                field.onChange(value);
              }}
            />
          );
        }}
      />
    );
  }

  return (
    <ComboboxBase
      {...props}
      onChange={(value: any) => {
        props.onChange && props.onChange(value, props.name);
      }}
    />
  );
};

export { Combobox };

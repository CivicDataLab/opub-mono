import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ComboboxSingleProps } from '../../../types';
import {
  Combobox as ComboboxBase,
  ComboboxMulti as ComboboxMultiBase,
} from '../../Combobox';
import { ComboboxMultiProps } from '../../Combobox/components/MultiSelect';

type ComboboxProps = {
  name: string;
  onChange?: (val: string, name: string) => void;
} & Omit<ComboboxSingleProps, 'onChange'>;

const Combobox = ({ ...props }: ComboboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => {
        return (
          <ComboboxBase
            {...field}
            {...props}
            value={field.value || props.value || props.defaultValue || ''}
            onChange={(value: any) => {
              props.onChange && props.onChange(String(value), props.name);
              field.onChange(value);
            }}
          />
        );
      }}
    />
  );
};

type Props = {
  name: string;
  onChange?: (val: string[], name: string) => void;
} & Omit<ComboboxMultiProps, 'onChange'>;

const ComboboxMulti = ({ ...props }: Props) => {
  const { control, getValues } = useFormContext();
  const { onChange, ...rest } = props;
  console.log(getValues(props.name));

  return (
    <Controller
      {...props}
      control={control}
      // desctructure onChange from field to avoid conflict with onChange from props
      render={({ field: { onChange: fieldChange, ...others } }) => {
        return (
          <ComboboxMultiBase
            {...others}
            {...rest}
            values={others.value || props.values || props.defaultValues || []}
            onValuesChange={(values: any) => {
              onChange && onChange(values, props.name);
              fieldChange(values);
            }}
          />
        );
      }}
    />
  );
};

export { Combobox, ComboboxMulti };

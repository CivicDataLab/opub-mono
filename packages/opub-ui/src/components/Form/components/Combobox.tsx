'use client';

import { ComboboxSingleProps, type Error } from '../../../types';
import {
  Combobox as ComboboxBase,
  ComboboxMulti as ComboboxMultiBase,
} from '../../Combobox';
import { ComboboxMultiProps } from '../../Combobox/components/MultiSelect';
import { Controller, useFormContext } from 'react-hook-form';

type ComboboxProps = {
  name: string;
  onChange?: (val: string, name: string) => void;
  required?: boolean;
  error?: Error | boolean;
} & Omit<ComboboxSingleProps, 'onChange'>;

const Combobox = ({ required, error, ...props }: ComboboxProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        rules={{ required: required }}
        render={({ field, fieldState }) => {
          return (
            <ComboboxBase
              {...field}
              {...props}
              error={fieldState.invalid && error}
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
  }

  return (
    <ComboboxBase
      {...props}
      onChange={(value: any) => {
        props.onChange && props.onChange(String(value), props.name);
      }}
    />
  );
};

type Props = {
  name: string;
  onChange?: (val: string[], name: string) => void;
  required?: boolean;
  error?: Error | boolean;
} & Omit<ComboboxMultiProps, 'onChange'>;

const ComboboxMulti = ({ required, error, ...props }: Props) => {
  const method = useFormContext();
  const { onChange, ...rest } = props;

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        rules={{ required: required }}
        // desctructure onChange from field to avoid conflict with onChange from props
        render={({
          field: { onChange: fieldChange, ...others },
          fieldState,
        }) => {
          return (
            <ComboboxMultiBase
              {...others}
              {...rest}
              error={fieldState.invalid && error}
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
  }

  return (
    <ComboboxMultiBase
      {...rest}
      onValuesChange={(values: any) => {
        onChange && onChange(values, props.name);
      }}
    />
  );
};

export { Combobox, ComboboxMulti };

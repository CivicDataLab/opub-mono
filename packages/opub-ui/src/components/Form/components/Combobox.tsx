'use client';

import { ComboboxSingleProps } from '../../../types';
import {
  Combobox as ComboboxBase,
  ComboboxMulti as ComboboxMultiBase,
} from '../../Combobox';
import { ComboboxMultiProps } from '../../Combobox/components/MultiSelect';
import { Controller, useFormContext } from 'react-hook-form';

type ComboboxProps = {
  name: string;
  onChange?: (val: string, name: string) => void;
} & Omit<ComboboxSingleProps, 'onChange'>;

const Combobox = ({ ...props }: ComboboxProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
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
} & Omit<ComboboxMultiProps, 'onChange'>;

const ComboboxMulti = ({ ...props }: Props) => {
  const method = useFormContext();
  const { onChange, ...rest } = props;

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
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

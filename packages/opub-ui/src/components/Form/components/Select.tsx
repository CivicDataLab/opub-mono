'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { SelectProps } from '../../../types';
import { Select as SelectWrapper } from '../../Select';

type Props = {
  name: string;
  required?: boolean;
} & Omit<SelectProps, 'name'>;

const Select = ({ required, error, ...props }: Props) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        rules={{ required: required }}
        render={({ field, fieldState }) => (
          <SelectWrapper
            placeholder="Select an Option"
            {...field}
            {...props}
            value={field.value}
            error={fieldState.invalid && error}
            onChange={(val, name) => {
              props.onChange && props.onChange(val, name);
              field.onChange(val);
            }}
          />
        )}
      />
    );
  }

  return <SelectWrapper {...props} />;
};

export { Select };

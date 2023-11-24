'use client';

import { SelectProps } from '../../../types';
import { Select as SelectWrapper } from '../../Select';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  required?: boolean;
} & Omit<SelectProps, 'name'>;

const Select = ({ required, ...props }: Props) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        rules={{ required: required }}
        render={({ field }) => (
          <SelectWrapper
            placeholder="Select an Option"
            {...field}
            {...props}
            value={field.value}
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

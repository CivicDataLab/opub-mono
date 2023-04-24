'use client';

import { TextField, TextfieldProps } from '../../TextField';
import { Controller, useFormContext } from 'react-hook-form';

const Input = ({ ...props }: TextfieldProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        render={({ field }) => (
          <TextField
            {...field}
            {...props}
            onChange={(val, name) => {
              props.onChange && props.onChange(val, name);
              field.onChange(val);
            }}
          />
        )}
      />
    );
  }

  return <TextField {...props} />;
};

export { Input };

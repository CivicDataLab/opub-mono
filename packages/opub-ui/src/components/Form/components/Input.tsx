'use client';

import { TextField, TextfieldProps } from '../../TextField';
import { Controller, useFormContext } from 'react-hook-form';

const Input = ({ required, error, ...props }: TextfieldProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        rules={{ required: required }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            {...props}
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

  return <TextField {...props} />;
};

export { Input };

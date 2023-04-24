'use client';

import { TimeField as TimeFieldBase, TimeFieldProps } from '../../TimeField';
import { parseTime } from '@internationalized/date';
import { Controller, useFormContext } from 'react-hook-form';

type FieldProps = {
  name: string;
  onChange?: (val: any, name: string) => void;
} & TimeFieldProps;

const TimeField = ({ ...props }: FieldProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        render={({ field }) => (
          <TimeFieldBase
            {...field}
            {...props}
            value={
              (field.value && parseTime(field.value)) ||
              props.value ||
              props.defaultValue
            }
            onChange={(value: any) => {
              props.onChange && props.onChange(value, props.name);
              field.onChange(value.toString());
            }}
          />
        )}
      />
    );
  }

  return (
    <TimeFieldBase
      {...props}
      onChange={(value: any) => {
        props.onChange && props.onChange(value, props.name);
      }}
    />
  );
};

export { TimeField };

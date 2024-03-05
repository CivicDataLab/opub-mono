'use client';

import { parseDate } from '@internationalized/date';
import { DateValue } from '@react-types/datepicker';
import { Controller, useFormContext } from 'react-hook-form';

import {
  MonthPicker as MonthBase,
  type DatePickerProps,
} from '../../DatePicker/MonthPicker';

type FieldProps = {
  name: string;
  onChange?: (val: any, name: string) => void;
  defaultValue?: DateValue;
  required?: boolean;
} & DatePickerProps;

const MonthPicker = ({ required, error, ...props }: FieldProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        rules={{ required: required }}
        render={({ field }) => (
          <MonthBase
            {...field}
            {...props}
            value={
              (field.value && parseDate(field.value)) ||
              props.value ||
              props.defaultValue
            }
            onChange={(val) => {
              if (val) {
                props.onChange && props.onChange(val.toString(), props.name);
                field.onChange(val.toString());
              }
            }}
          />
        )}
      />
    );
  }

  return <MonthBase {...props} />;
};

export { MonthPicker };

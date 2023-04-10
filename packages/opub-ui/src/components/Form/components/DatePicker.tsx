import { parseDate } from '@internationalized/date';
import { DateValue } from '@react-types/datepicker';
import { RangeValue } from '@react-types/shared';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  DatePicker as DatePickerBase,
  DatePickerProps,
  DateRangePicker as DateRangePickerBase,
  RangePickerProps,
} from '../../DatePicker';

type PickerProps = {
  name: string;
  onChange?: (val: string, name: string) => void;
  defaultValue?: DateValue;
} & DatePickerProps;

const DatePicker = ({ ...props }: PickerProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        render={({ field }) => (
          <DatePickerBase
            {...field}
            {...props}
            value={
              (field.value && parseDate(field.value)) ||
              props.value ||
              props.defaultValue
            }
            onChange={(val) => {
              props.onChange && props.onChange(val.toString(), props.name);
              field.onChange(val.toString());
            }}
          />
        )}
      />
    );
  }

  return <DatePickerBase {...props} />;
};

type RangeProps = {
  name: string;
  onChange?: (val: RangeValue<DateValue>, name: string) => void;
  defaultValue?: RangeValue<DateValue>;
  value?: RangeValue<DateValue>;
} & RangePickerProps;

const DateRangePicker = ({ ...props }: RangeProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        render={({ field }) => (
          <DateRangePickerBase
            {...field}
            {...props}
            value={
              field.value
                ? {
                    start: parseDate(field.value.start),
                    end: parseDate(field.value.end),
                  }
                : props.defaultValue || props.value
            }
            onChange={(val: any) => {
              const formatted = {
                start: val.start.toString(),
                end: val.end.toString(),
              };
              props.onChange && props.onChange(formatted, props.name);
              field.onChange(formatted);
            }}
          />
        )}
      />
    );
  }

  return (
    <DateRangePickerBase
      {...props}
      onChange={(val: any) => {
        const formatted = {
          start: val.start.toString(),
          end: val.end.toString(),
        };
        props.onChange && props.onChange(formatted, props.name);
      }}
    />
  );
};

export { DatePicker, DateRangePicker };

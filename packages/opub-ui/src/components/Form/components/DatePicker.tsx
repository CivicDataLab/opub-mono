'use client';

import { parseDate } from '@internationalized/date';
import { DateValue } from '@react-types/datepicker';
import { RangeValue } from '@react-types/shared';
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
  required?: boolean;
} & DatePickerProps;

const DatePicker = ({ required, error, ...props }: PickerProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        rules={{ required: required }}
        render={({ field, fieldState }) => {
          const { onChange: fieldOnChange, ...fieldProps } = field;
          const dateValue =
            (field.value && parseDate(field.value)) ||
            props.value ||
            props.defaultValue;
          return (
            <DatePickerBase
              {...(props as any)}
              {...fieldProps}
              error={fieldState.invalid && error}
              value={dateValue || undefined}
              onChange={(val: DateValue | null) => {
                if (val) {
                  props.onChange && props.onChange(val.toString(), props.name);
                  fieldOnChange(val.toString());
                } else {
                  fieldOnChange(null);
                }
              }}
            />
          );
        }}
      />
    );
  }

  return <DatePickerBase {...props} />;
};

type RangeProps = {
  name: string;
  onChange?: (val: { start: string; end: string }, name: string) => void;
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
        render={({ field }) => {
          const { onChange: fieldOnChange, ...fieldProps } = field;
          const rangeValue = field.value
            ? {
                start: parseDate(field.value.start),
                end: parseDate(field.value.end),
              }
            : props.defaultValue || props.value || undefined;
          return (
            <DateRangePickerBase
              {...(props as any)}
              {...fieldProps}
              value={rangeValue}
              onChange={(val: RangeValue<DateValue> | null) => {
                if (val) {
                  const formatted = {
                    start: val.start.toString(),
                    end: val.end.toString(),
                  };
                  props.onChange && props.onChange(formatted, props.name);
                  fieldOnChange(formatted);
                } else {
                  fieldOnChange(null);
                }
              }}
            />
          );
        }}
      />
    );
  }

  return (
    <DateRangePickerBase
      {...(props as any)}
      onChange={(val: RangeValue<DateValue> | null) => {
        if (val) {
          const formatted = {
            start: val.start.toString(),
            end: val.end.toString(),
          };
          props.onChange && props.onChange(formatted, props.name);
        }
      }}
    />
  );
};

export { DatePicker, DateRangePicker };

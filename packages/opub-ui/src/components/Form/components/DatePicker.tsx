import { parseDate } from '@internationalized/date';
import { AriaDateRangePickerProps, DateValue } from '@react-types/datepicker';
import { DateRangePickerAria } from 'react-aria';
import { Controller, useFormContext } from 'react-hook-form';
import {
  DatePicker as DatePickerBase,
  DatePickerProps,
  DateRangePicker as DateRangePickerBase,
  RangePickerProps,
} from '../../DatePicker';
import { RangeValue } from '@react-types/shared';

type PickerProps = {
  name: string;
  onChange?: (val: string, name: string) => void;
  defaultValue?: DateValue;
} & DatePickerProps;

const DatePicker = ({ ...props }: PickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => (
        <DatePickerBase
          {...field}
          {...props}
          value={parseDate(field.value) || props.value || props.defaultValue}
          onChange={(val) => {
            props.onChange && props.onChange(val.toString(), props.name);
            field.onChange(val.toString());
          }}
        />
      )}
    />
  );
};

type RangeProps = {
  name: string;
  onChange?: (val: RangeValue<DateValue>, name: string) => void;
  defaultValue?: RangeValue<DateValue>;
  value?: RangeValue<DateValue>;
} & RangePickerProps;

const DateRangePicker = ({ ...props }: RangeProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
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
};

export { DatePicker, DateRangePicker };

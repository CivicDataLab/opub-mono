import { parseDate } from '@internationalized/date';
import { DateValue } from '@react-types/datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import {
  DatePicker as DatePickerBase,
  DatePickerProps,
} from '../../DatePicker';

type FieldProps = {
  name: string;
  onChange?: (val: DateValue, name: string) => void;
  defaultValue?: DateValue;
} & DatePickerProps;

const DatePicker = ({ ...props }: FieldProps) => {
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
            props.onChange && props.onChange(val, props.name);
            field.onChange(val.toString());
          }}
        />
      )}
    />
  );
};

export { DatePicker };

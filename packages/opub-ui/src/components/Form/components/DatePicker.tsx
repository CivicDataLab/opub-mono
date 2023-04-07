import { DateValue } from '@react-types/datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import {
  DatePicker as DatePickerBase,
  DatePickerProps,
} from '../../DatePicker';

type FieldProps = {
  name: string;
  onChange?: (val: DateValue, name: string) => void;
} & DatePickerProps;

const DatePicker = ({ ...props }: FieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      // Excluding value prop since it's breaking the hook
      render={({ field: { value, ...other } }) => (
        <DatePickerBase
          {...other}
          {...props}
          onChange={(val) => {
            props.onChange && props.onChange(val, props.name);
            other.onChange(val.toString());
          }}
        />
      )}
    />
  );
};

export { DatePicker };

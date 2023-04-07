import { DateValue } from '@react-types/datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { DateField as DateFieldBase, DatFieldProps } from '../../DateField';
import { parseDate } from '@internationalized/date';

type FieldProps = {
  name: string;
  onChange?: (val: DateValue, name: string) => void;
  value?: DateValue;
} & DatFieldProps;

const DateField = ({ ...props }: FieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => {
        return (
          <DateFieldBase
            {...field}
            {...props}
            value={parseDate(field.value) || props.value || props.defaultValue}
            onChange={(value: DateValue) => {
              props.onChange && props.onChange(value, props.name);
              field.onChange(value);
            }}
          />
        );
      }}
    />
  );
};

export { DateField };

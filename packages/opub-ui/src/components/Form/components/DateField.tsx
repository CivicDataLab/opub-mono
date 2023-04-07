import { DateValue } from '@react-types/datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { DateField as DateFieldBase, DatFieldProps } from '../../DateField';

type FieldProps = {
  name: string;
  onChange?: (val: DateValue, name: string) => void;
} & DatFieldProps;

const DateField = ({ ...props }: FieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => (
        <DateFieldBase
          {...field}
          {...props}
          onChange={(value: DateValue) => {
            props.onChange && props.onChange(value, props.name);
            field.onChange(value);
          }}
        />
      )}
    />
  );
};

export { DateField };

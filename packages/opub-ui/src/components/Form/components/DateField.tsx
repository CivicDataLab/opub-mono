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
      // Excluding value prop since it's breaking the hook
      render={({ field: { value, ...other } }) => (
        <DateFieldBase
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

export { DateField };

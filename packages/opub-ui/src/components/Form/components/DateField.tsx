import { parseDate } from '@internationalized/date';
import { DateValue } from '@react-types/datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { DateField as DateFieldBase, DatFieldProps } from '../../DateField';

type FieldProps = {
  name: string;
  onChange?: (val: string, name: string) => void;
  value?: DateValue;
} & DatFieldProps;

const DateField = ({ ...props }: FieldProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        render={({ field }) => {
          return (
            <DateFieldBase
              {...field}
              {...props}
              value={
                (field.value && parseDate(field.value)) ||
                props.value ||
                props.defaultValue
              }
              onChange={(value: DateValue) => {
                props.onChange && props.onChange(value.toString(), props.name);
                field.onChange(value.toString());
              }}
            />
          );
        }}
      />
    );
  }

  return <DateFieldBase {...props} />;
};

export { DateField };

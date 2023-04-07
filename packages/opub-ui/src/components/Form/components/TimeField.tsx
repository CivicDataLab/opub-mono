import { parseTime } from '@internationalized/date';
import { Controller, useFormContext } from 'react-hook-form';
import { TimeField as TimeFieldBase, TimeFieldProps } from '../../TimeField';

type FieldProps = {
  name: string;
  onChange?: (val: any, name: string) => void;
} & TimeFieldProps;

const TimeField = ({ ...props }: FieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => {
        return (
          <TimeFieldBase
            {...field}
            {...props}
            value={parseTime(field.value) || props.value || props.defaultValue}
            onChange={(value: any) => {
              props.onChange && props.onChange(value, props.name);
              field.onChange(value.toString());
            }}
          />
        );
      }}
    />
  );
};

export { TimeField };

import { TextField, TextfieldProps } from '../../TextField';
import { Controller, useFormContext } from 'react-hook-form';

const Input = ({ ...props }: TextfieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          onChange={(val, name) => {
            props.onChange && props.onChange(val, name);
            field.onChange(val);
          }}
        />
      )}
    />
  );
};

export { Input };

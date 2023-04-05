import { TextField, TextfieldProps } from '../../TextField';
import { Controller, useFormContext } from 'react-hook-form';

const Input = ({ ...props }: TextfieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => <TextField {...field} {...props} />}
    />
  );
};

export { Input };

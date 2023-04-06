import { Controller, useFormContext } from 'react-hook-form';
import { CheckboxProps } from '../../../types';
import { Checkbox as CheckboxBase } from '../../Checkbox';

const Checkbox = ({ ...props }: CheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => (
        <CheckboxBase
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

export { Checkbox };

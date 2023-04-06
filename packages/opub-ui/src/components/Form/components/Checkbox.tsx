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
          checked={props.checked || field.value}
          onChange={(checked, name) => {
            props.onChange && props.onChange(checked, name);
            props.checked
              ? field.onChange(checked ? props.checked : undefined)
              : field.onChange(checked);
          }}
        />
      )}
    />
  );
};

export { Checkbox };

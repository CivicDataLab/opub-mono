import { Controller, useFormContext } from 'react-hook-form';
import { CheckboxGroupProps } from '../../../types';
import { CheckboxGroup as CheckboxGroupBase } from '../../CheckboxGroup';

type Props = {
  name: string;
} & Omit<CheckboxGroupProps, 'name'>;

const CheckboxGroup = ({ ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => (
        <CheckboxGroupBase
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

export { CheckboxGroup };

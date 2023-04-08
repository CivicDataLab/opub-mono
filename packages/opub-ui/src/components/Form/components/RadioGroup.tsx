import { Controller, useFormContext } from 'react-hook-form';
import {
  RadioGroup as RadioGroupBase,
  RadioProps,
  RadioItem,
} from '../../RadioGroup';

export interface Props extends Omit<RadioProps, 'name'> {
  name: string;
}

const RadioGroup = ({ ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => (
        <RadioGroupBase
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

export { RadioGroup, RadioItem };

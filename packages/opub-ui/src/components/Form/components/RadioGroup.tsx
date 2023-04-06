import { Controller, useFormContext } from 'react-hook-form';
import {
  RadioGroup as RadioGroupBase,
  RadioGroupProps,
  RadioItem,
} from '../../RadioGroup';

type Props = {
  name: string;
} & Omit<RadioGroupProps, 'name'>;

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

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
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
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
  }

  return <RadioGroupBase {...props} />;
};

export { RadioGroup, RadioItem };

import { Controller, useFormContext } from 'react-hook-form';
import {
  RangeSlider as RangeSliderBase,
  RangeSliderProps,
} from '../../RangeSlider';

type Props = {
  name: string;
} & Omit<RangeSliderProps, 'name'>;

const RangeSlider = ({ ...props }: Props) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        render={({ field }) => (
          <RangeSliderBase
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

  return <RangeSliderBase {...props} />;
};

export { RangeSlider };

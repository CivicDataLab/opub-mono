import { Controller, useFormContext } from 'react-hook-form';
import {
  RangeSlider as RangeSliderBase,
  RangeSliderProps,
} from '../../RangeSlider';

type Props = {
  name: string;
} & Omit<RangeSliderProps, 'name'>;

const RangeSlider = ({ ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => <RangeSliderBase {...field} {...props} />}
    />
  );
};

export { RangeSlider };

import { Controller, useFormContext } from 'react-hook-form';
import { SelectProps } from '../../../types';
import { Select as SelectWrapper } from '../../Select';

type Props = {
  name: string;
} & Omit<SelectProps, 'name'>;

const Select = ({ ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      control={control}
      render={({ field }) => (
        <SelectWrapper placeholder="Select an Option" {...field} {...props} />
      )}
    />
  );
};

export { Select };

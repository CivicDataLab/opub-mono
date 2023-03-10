import { TextFieldProps } from '@ui/types/input';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../Input';

export type Props = TextFieldProps & {
  name: string;
  onFieldChange?(e: any): void;
};

export const TextField = (props: Props) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        {...props}
        render={({ field }) => (
          <Input
            {...props}
            {...field}
            onChange={(e, id) => {
              field.onChange(e);
              props.onChange && props.onChange(e, id);
            }}
          />
        )}
      />
    </>
  );
};

import { InputProps } from '@ui/types/input';
import { Controller, useFormContext } from 'react-hook-form';
import { InputBase } from '../InputBase';

export interface TextFieldProps extends InputProps {
  name: string;
  onFieldChange?(e: any): void;
}

export const TextField = (props: TextFieldProps) => {
  const { control } = useFormContext();
  const { name, label, ...otherProps } = props;
  function handleChange(e: any) {
    props.onFieldChange && props.onFieldChange(e);
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        {...otherProps}
        render={({ field }) => (
          <InputBase
            label={label}
            // errorMessage={meta.touched ? meta.error : null}
            {...field}
          />
        )}
      />
    </>
  );
};

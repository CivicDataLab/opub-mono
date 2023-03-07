import { useField } from 'formik';
import { InputBase } from '../InputBase';
import { InputProps } from '@ui/types/input';
import { Controller } from 'react-hook-form';

export interface TextFieldProps extends InputProps {
  name: string;
  onFieldChange?(e: any): void;
  control?: any;
}

export const TextField = (props: TextFieldProps) => {
  const { name, label, control, ...otherProps } = props;
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

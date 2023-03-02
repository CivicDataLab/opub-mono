import { useField } from 'formik';
import { InputBase, InputProps } from '../InputBase';

export interface FromikTextFieldProps extends InputProps {
  name: string;
  onFieldChange?: any;
}

const TextField = ({ name, label, ...props }: FromikTextFieldProps) => {
  const [field, meta, helpers] = useField(name);

  function handleChange(e: any) {
    props.onFieldChange && props.onFieldChange(e);
  }

  return (
    <>
      <InputBase
        label={label}
        errorMessage={meta.touched ? meta.error : null}
        {...field}
        {...props}
      />
    </>
  );
};

export { TextField };

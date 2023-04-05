import React from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { Input } from './components/TextField';

type Props = {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  formOptions?: any;
};

const Form = (props: Props) => {
  const { formOptions = {}, onSubmit = () => {}, children, ...others } = props;
  const methods = useForm(formOptions);

  return (
    <FormProvider {...methods}>
      <form
        {...others}
        onSubmit={methods.handleSubmit((data) => {
          onSubmit && onSubmit(data);
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.Input = Input;

export { Form };

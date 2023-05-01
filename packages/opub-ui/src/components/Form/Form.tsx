'use client';

import React from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  useWatch,
} from 'react-hook-form';

export type FormProps = {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  formOptions?: UseFormProps;
  resetValues?: any;
  onChange?: (handler: any) => void;
};

export const Form: React.FunctionComponent<FormProps> = function (
  props: FormProps
) {
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const {
    formOptions = {},
    onSubmit = () => {},
    children,
    resetValues,
    onChange,
    ...others
  } = props;
  const methods = useForm(formOptions);
  const values = useWatch({
    control: methods.control,
  });

  React.useEffect(() => {
    methods.reset(formOptions.defaultValues);
  }, [formOptions.defaultValues]);

  React.useEffect(() => {
    resetValues && submitSuccess && methods.reset(resetValues);
    const timeOut = setTimeout(() => {
      setSubmitSuccess(false);
    }, 10);

    return () => {
      clearTimeout(timeOut);
    };
  }, [submitSuccess]);

  React.useEffect(() => {
    onChange && onChange(values);
  }, [values]);

  return (
    <FormProvider {...methods}>
      <form
        {...others}
        onSubmit={methods.handleSubmit((data) => {
          onSubmit && onSubmit(data);
          setSubmitSuccess(true);
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
};

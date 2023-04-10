import React from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';

export type FormProps = {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  formOptions?: UseFormProps;
  resetValues?: any;
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
    ...others
  } = props;
  const methods = useForm(formOptions);

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

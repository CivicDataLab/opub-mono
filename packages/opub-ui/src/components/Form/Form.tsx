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
  const formRef = React.useRef<HTMLFormElement>(null);
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

  // Press cmd + enter to submit form
  function downHandler({
    key,
    metaKey,
  }: {
    key: string;
    metaKey?: boolean;
  }): void {
    if (key === 'Enter' && metaKey) {
      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  }

  // Add event listeners to handle cmd + enter
  React.useEffect(() => {
    formRef.current?.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      formRef.current?.removeEventListener('keydown', downHandler);
    };
  }, []);

  // Reset form after submit success and resetValues is provided
  React.useEffect(() => {
    resetValues && submitSuccess && methods.reset(resetValues);
    const timeOut = setTimeout(() => {
      setSubmitSuccess(false);
    }, 10);

    return () => {
      clearTimeout(timeOut);
    };
  }, [submitSuccess]);

  // Trigger onChange when values change
  React.useEffect(() => {
    onChange && onChange(values);
  }, [values]);

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
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

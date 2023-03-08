import cx from 'classnames';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import styles from './Form.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  children: React.ReactNode;
  validationSchema?: any;
  formSubmit?(e: any): void;
  defaultValues?: any;
};

const Form = (props: Props) => {
  const { validationSchema, defaultValues, formSubmit, children } = props;

  const options = {
    defaultValues,
  };
  const formOptions = validationSchema
    ? { ...options, resolver: yupResolver(validationSchema) }
    : { ...options };

  const methods = useForm(formOptions);
  const themeClass = cx(styles.base, {});

  return (
    <FormProvider {...methods}>
      <form
        className={themeClass}
        onSubmit={methods.handleSubmit((data) => {
          formSubmit && formSubmit(data);
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export { Form };

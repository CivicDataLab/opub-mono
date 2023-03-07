import cx from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Form.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  children: React.ReactNode;
  validationSchema?: any;
  formSubmit?(e: any): void;
  defaultValues?: any;
};

const Form = (props: Props) => {
  const { validationSchema, defaultValues = {}, formSubmit, children } = props;

  const options = {
    defaultValues: defaultValues,
  };
  const formOptions = validationSchema
    ? { ...options, resolver: yupResolver(validationSchema) }
    : { ...options };

  const { handleSubmit, control } = useForm(formOptions);
  const themeClass = cx(styles.base, {});

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        /* @ts-ignore */
        control,
      });
    }
    return child;
  });
  return (
    <form
      className={themeClass}
      onSubmit={handleSubmit((data) => {
        formSubmit && formSubmit(data);
      })}
    >
      {childrenWithProps}
    </form>
  );
};

export { Form };

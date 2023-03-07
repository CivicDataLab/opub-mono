import cx from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Form.module.scss';

type Props = {
  children: React.ReactNode;
  validationSchema?: any;
  formSubmit?: any;
  initialValues: any;
};

const Form = (props: Props) => {
  const { validationSchema, formSubmit, children } = props;
  const { handleSubmit, control } = useForm();
  const themeClass = cx(styles.base, {});

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      /* @ts-ignore */
      return React.cloneElement(child, { control: control });
    }
    return child;
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        formSubmit && formSubmit(data);
      })}
    >
      {childrenWithProps}
    </form>
  );
};

export { Form };

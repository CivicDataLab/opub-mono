import cx from 'classnames';
import { Form as FormikForm, Formik } from 'formik';
import React from 'react';
import styles from './Form.module.scss';

type Props = {
  children: React.ReactNode;
  validationSchema?: any;
  formSubmit?: any;
  initialValues: any;
};

const Form = (props: Props) => {
  const { validationSchema, formSubmit, children } = props;

  const themeClass = cx(styles.base, {});

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={validationSchema || {}}
      onSubmit={(values, actions) => {
        formSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {() => <FormikForm className={themeClass}>{children}</FormikForm>}
    </Formik>
  );
};

export { Form };

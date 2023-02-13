import cx from 'classnames';
import { Form as FormikForm, Formik } from 'formik';
import React from 'react';
import styles from './Form.module.scss';

type Props = {
  children: React.ReactNode;
  schema?: any;
  formSubmit?: any;
  initialValues: any;
};

const Form = React.forwardRef((props: Props, ref: any) => {
  const { schema, formSubmit, children } = props;

  const themeClass = cx(styles.base, {});

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={schema || {}}
      onSubmit={(values, actions) => {
        formSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {() => <FormikForm className={themeClass}>{children}</FormikForm>}
    </Formik>
  );
});

export { Form };

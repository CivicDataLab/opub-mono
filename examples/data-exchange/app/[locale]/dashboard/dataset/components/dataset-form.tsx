import React from 'react';
import { Form } from 'opub-ui';

interface DatasetFormProps {
  onSubmit: (e?: any) => void;
  formOptions: any;
  onChange?: (e?: any) => void;
  children: React.ReactNode;
  submitRef: React.RefObject<HTMLButtonElement>;
}

export function DatasetForm({
  onSubmit,
  formOptions,
  onChange,
  children,
  submitRef,
}: DatasetFormProps) {
  return (
    <Form onSubmit={onSubmit} formOptions={formOptions} onChange={onChange}>
      {children}
      <button hidden ref={submitRef}>
        submit form
      </button>
    </Form>
  );
}

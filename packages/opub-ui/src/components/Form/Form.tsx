import React from 'react';
import {
  SubmitHandler,
  useForm,
  FormProvider,
  UseFormProps,
} from 'react-hook-form';
import {
  Input,
  Select,
  RangeSlider,
  RadioGroup,
  RadioItem,
  Checkbox,
  CheckboxGroup,
} from './components';

type Props = {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  formOptions?: UseFormProps;
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
Form.Select = Select;
Form.RangeSlider = RangeSlider;
Form.RadioGroup = RadioGroup;
Form.RadioItem = RadioItem;
Form.Checkbox = Checkbox;
Form.CheckboxGroup = CheckboxGroup;

export { Form };

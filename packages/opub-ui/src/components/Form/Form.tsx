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
  DateField,
} from './components';

type Props = {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  formOptions?: UseFormProps;
  [resetValues: string]: any;
};

const Form = (props: Props) => {
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

Form.Input = Input;
Form.Select = Select;
Form.RangeSlider = RangeSlider;
Form.RadioGroup = RadioGroup;
Form.RadioItem = RadioItem;
Form.Checkbox = Checkbox;
Form.CheckboxGroup = CheckboxGroup;
Form.DateField = DateField;

export { Form };

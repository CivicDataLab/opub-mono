import React from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import {
  Checkbox,
  CheckboxGroup,
  DateField,
  DatePicker,
  DateRangePicker,
  Input,
  RadioGroup,
  RadioItem,
  RangeSlider,
  Select,
  TimeField,
  Combobox,
  ComboboxMulti,
} from './components';

export type FormProps = {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  formOptions?: UseFormProps;
  resetValues?: any;
};

export const Form: React.FunctionComponent<FormProps> & {
  Input: typeof Input;
  Select: typeof Select;
  RangeSlider: typeof RangeSlider;
  RadioGroup: typeof RadioGroup;
  RadioItem: typeof RadioItem;
  Checkbox: typeof Checkbox;
  CheckboxGroup: typeof CheckboxGroup;
  DateField: typeof DateField;
  DatePicker: typeof DatePicker;
  DateRangePicker: typeof DateRangePicker;
  TimeField: typeof TimeField;
  Combobox: typeof Combobox;
  ComboboxMulti: typeof ComboboxMulti;
} = function (props: FormProps) {
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
Form.DatePicker = DatePicker;
Form.DateRangePicker = DateRangePicker;
Form.TimeField = TimeField;
Form.Combobox = Combobox;
Form.ComboboxMulti = ComboboxMulti;

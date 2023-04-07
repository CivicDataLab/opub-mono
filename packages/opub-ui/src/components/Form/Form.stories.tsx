import { parseDate } from '@internationalized/date';
import { Meta } from '@storybook/react';
import React from 'react';
import { Button } from '../Button';
import { FormLayout } from '../FormLayout';
import { Text } from '../Text';
import { Form } from './Form';

/**
 * A wrapper component that handles the submission of forms.
 */
const meta = {
  component: Form,

  argTypes: {
    children: {
      control: 'null',
      description: 'Form Field elements',
    },
  },
} satisfies Meta<typeof Form>;
export default meta;

const options = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'lastWeek' },
];

const checkboxOptions = [
  {
    label: 'ReactJs',
    value: 'react',
    helpText: 'Kinda Popular these days.',
  },
  {
    label: 'VueJs',
    value: 'vue',
  },
  {
    label: 'AngularJs',
    value: 'angular',
  },
];

const defaultValBase = {
  text: 'Excalibur',
  select: 'yesterday',
  range: [6],
  checkbox: true,
  'checkbox-group': ['angular', 'vue'],
  radio: '1',
  date: '2020-02-06',
  'date-picker': '1998-03-25',
  'date-range': {
    start: '2020-02-06',
    end: '2020-02-10',
  },
};

export const FormBase = ({ ...args }) => {
  const [values, setValues] = React.useState<any>();

  return (
    <>
      <Form
        onSubmit={(e) => setValues(e)}
        formOptions={{ defaultValues: defaultValBase }}
        {...args}
      >
        <FormLayout>
          <Form.Input name="text" label="Name" />
          <Form.Select name="select" label="Select Period" options={options} />
          <Form.RangeSlider name="range" label="Budget" prefix={<p>$</p>} />
          <Form.Checkbox name="checkbox"> I agree to T&C</Form.Checkbox>
          <Form.CheckboxGroup
            name="checkbox-group"
            title="Pick your Poison"
            options={checkboxOptions}
          />
          <Form.RadioGroup name="radio" title="Select an item">
            <Form.RadioItem value="1">Item 1</Form.RadioItem>
            <Form.RadioItem value="2">Item 2</Form.RadioItem>
            <Form.RadioItem value="3">Item 3</Form.RadioItem>
          </Form.RadioGroup>

          <FormLayout.Group>
            <Form.DateField
              onChange={(e) => console.log(e)}
              name="date"
              label="Choose Date"
            />
            <Form.DatePicker
              onChange={(e) => console.log(e)}
              name="date-picker"
              label="Choose Birthday"
            />
            <Form.DateRangePicker
              onChange={(e) => console.log(e)}
              name="date-range"
              label="Choose Range"
            />
          </FormLayout.Group>

          <Button submit size="slim">
            Submit
          </Button>
        </FormLayout>
      </Form>

      <br />
      <Text>{values ? 'Submitted' : 'Default'} Output:</Text>
      <br />
      <pre>{JSON.stringify(values || defaultValBase, null, 2)}</pre>
    </>
  );
};

export const AsyncDefaultValues = () => {
  const [defaultVal, setDefaultVal] = React.useState({});
  React.useEffect(() => {
    const defaultOptions = defaultValBase;
    setDefaultVal(defaultOptions);
  }, []);

  return <FormBase formOptions={{ defaultValues: defaultVal }} />;
};

export const ResetOnSubmit = () => {
  return (
    <FormBase
      resetValues={{
        text: '',
        select: '',
        range: [0],
        checkbox: false,
        'checkbox-group': [],
        radio: '',
        date: '',
      }}
    />
  );
};

export const DateFieldOnly = () => {
  const defVal = parseDate('2020-02-05');
  // console.log(defVal, 'defVal');

  return (
    <Form
      formOptions={{
        defaultValues: {
          date: defVal,
        },
      }}
    >
      <Form.DateField label="Label" name="date" value={defVal} />
    </Form>
  );
};

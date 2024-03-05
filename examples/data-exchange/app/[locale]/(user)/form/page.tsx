'use client';

import React from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Combobox,
  DateField,
  DatePicker,
  DateRangePicker,
  Form,
  FormLayout,
  Input,
  MonthPicker,
  RadioGroup,
  RadioItem,
  RangeSlider,
  Select,
  Text,
  TimeField,
} from 'opub-ui';

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

const comboboxOptions: {
  value: string;
  label: string;
}[] = [
  {
    value: 'Apple',
    label: 'Apple',
  },
  {
    value: 'Banana',
    label: 'Banana',
  },
  {
    value: 'Burger',
    label: 'Burger',
  },
  {
    value: 'Cherry',
    label: 'Cherry',
  },
  {
    value: 'Grapes',
    label: 'Grapes',
  },
  {
    value: 'Mango',
    label: 'Mango',
  },
  {
    value: 'Orange',
    label: 'Orange',
  },
  {
    value: 'Pineapple',
    label: 'Pineapple',
  },
  {
    value: 'Strawberry',
    label: 'Strawberry',
  },
  {
    value: 'Watermelon',
    label: 'Watermelon',
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
  time: '16:45:00',
  month: '2020-02-01',
  combobox: 'Apple',
  comboboxMulti: [
    {
      value: 'Apple',
      label: 'Apple',
    },
    {
      value: 'Banana',
      label: 'Banana',
    },
    {
      value: 'Burger',
      label: 'Burger',
    },
  ],
};

export default function Page() {
  const [values, setValues] = React.useState<any>();

  return (
    <div className="container py-4">
      <>
        <Form
          onSubmit={(e) => {
            setValues(e);
            console.log(e);
          }}
          formOptions={{ defaultValues: defaultValBase }}
        >
          <FormLayout>
            <Input name="text" label="Name" />
            <Select name="select" label="Select Period" options={options} />
            <RangeSlider name="range" label="Budget" prefix={<p>$</p>} />
            <Checkbox name="checkbox"> I agree to T&C</Checkbox>
            <CheckboxGroup
              name="checkbox-group"
              title="Pick your Poison"
              options={checkboxOptions}
            />
            <RadioGroup name="radio" title="Select an item">
              <RadioItem value="1">Item 1</RadioItem>
              <RadioItem value="2">Item 2</RadioItem>
              <RadioItem value="3">Item 3</RadioItem>
            </RadioGroup>

            <FormLayout.Group>
              <DateField name="date" label="Choose Date" />
              <DatePicker name="date-picker" label="Choose Birthday" />
              <MonthPicker name="month" label="Choose Month" />
              <TimeField name="time" label="Choose Time" />
            </FormLayout.Group>
            <DateRangePicker name="date-range" label="Choose Range" />
            <FormLayout.Group>
              <Combobox
                list={comboboxOptions}
                name="combobox"
                placeholder="Type to see options"
                label="Select Single Item"
                onChange={(val, name) => {
                  console.log(val, name);
                }}
              />
              <Combobox
                list={comboboxOptions}
                name="comboboxMulti"
                label="Select Multiple Item"
                placeholder="Type to see options"
                displaySelected
                selectedValue={[]}
                onChange={(val, name) => {
                  console.log(val, name);
                }}
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
    </div>
  );
}

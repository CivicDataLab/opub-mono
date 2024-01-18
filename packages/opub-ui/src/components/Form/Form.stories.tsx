import { Button } from "../Button";
import { FormLayout } from "../FormLayout";
import { Text } from "../Text";
import { Form } from "./Form";
import {
  Checkbox,
  Input,
  RangeSlider,
  CheckboxGroup,
  RadioGroup,
  RadioItem,
  DateField,
  DatePicker,
  TimeField,
  DateRangePicker,
  Combobox,
} from "./components";
import { Meta } from "@storybook/react";
import React from "react";

/**
 * A wrapper component that handles the submission of forms.
 */
const meta = {
  title: "Components/Form",
  component: Form,

  argTypes: {
    children: {
      control: "null",
      description: "Form Field elements",
    },
  },
} satisfies Meta<typeof Form>;
export default meta;

const options = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "lastWeek" },
];

const checkboxOptions = [
  {
    label: "ReactJs",
    value: "react",
    helpText: "Kinda Popular these days.",
  },
  {
    label: "VueJs",
    value: "vue",
  },
  {
    label: "AngularJs",
    value: "angular",
  },
];

const defaultValBase = {
  text: "Excalibur",
  select: "yesterday",
  range: [6],
  checkbox: true,
  "checkbox-group": ["angular", "vue"],
  radio: "1",
  date: "2020-02-06",
  "date-picker": "1998-03-25",
  "date-range": {
    start: "2020-02-06",
    end: "2020-02-10",
  },
  time: "04:45",
  combobox: "Apple",
  comboboxMulti: ["Banana", "Broccoli", "Candy", "Carrot"],
};

const comboboxOptions = [
  "Apple",
  "Banana",
  "Broccoli",
  "Burger",
  "Cake",
  "Candy",
  "Carrot",
  "Cherry",
  "Chocolate",
  "Cookie",
  "Cucumber",
  "Donut",
  "Fish",
  "Fries",
  "Grape",
  "Green apple",
  "Hot dog",
  "Ice cream",
  "Kiwi",
  "Lemon",
  "Lollipop",
  "Onion",
  "Orange",
  "Pasta",
  "Pineapple",
  "Pizza",
  "Potato",
  "Salad",
  "Sandwich",
  "Steak",
  "Strawberry",
  "Tomato",
  "Watermelon",
];

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
          <Input name="text" label="Name" />
          {/* <Select name="select" label="Select Period" options={options} /> */}
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

            <TimeField name="time" label="Choose Range" />
          </FormLayout.Group>
          <DateRangePicker name="date-range" label="Choose Time" />
          <FormLayout.Group>
            <Combobox
              list={comboboxOptions}
              name="combobox"
              placeholder="Type to see options"
              label="Select Single Item"
              onChange={(val) => {
                console.log(val);
              }}
            />
            <Combobox
              list={comboboxOptions}
              name="comboboxMulti"
              label="Select Multiple Item"
              placeholder="Type to see options"
              displaySelected
              selectedValue={[]}
              onChange={(val) => {
                console.log(val);
              }}
            />
          </FormLayout.Group>

          <Button submit size="slim">
            Submit
          </Button>
        </FormLayout>
      </Form>

      <br />
      <Text>{values ? "Submitted" : "Default"} Output:</Text>
      <br />
      <pre>{JSON.stringify(values || defaultValBase, null, 2)}</pre>
    </>
  );
};

export const AsyncDefaultValues = () => {
  const [defaultVal, setDefaultVal] = React.useState({});
  React.useEffect(() => {
    const defaultOptions = { ...defaultValBase };
    setDefaultVal(defaultOptions);
  }, []);

  return <FormBase formOptions={{ defaultValues: defaultVal }} />;
};

export const ResetOnSubmit = () => {
  return (
    <FormBase
      resetValues={{
        text: "",
        select: "",
        range: [0],
        checkbox: false,
        "checkbox-group": [],
        radio: "",
        date: "",
      }}
    />
  );
};

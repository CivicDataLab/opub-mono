import React from 'react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { Meta } from '@storybook/react';
import { IconFile } from '@tabler/icons-react';

import { Button } from '../Button';
import { FormLayout } from '../FormLayout';
import { Text } from '../Text';
import { Thumbnail } from '../Thumbnail';
import {
  Checkbox,
  CheckboxGroup,
  Combobox,
  DateField,
  FormDatePicker as DatePicker,
  FormDateRangePicker as DateRangePicker,
  DropZone,
  Input,
  FormMonthPicker as MonthPicker,
  RadioGroup,
  RadioItem,
  RangeSlider,
  Select,
  Switch,
  TimeField,
} from './components';
import { Form } from './Form';

/**
 * A wrapper component that handles the submission of forms.
 */
const meta = {
  title: 'Components/Form',
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
  switch: true,
  'checkbox-group': ['angular', 'vue'],
  radio: '1',
  date: '2020-02-06',
  'date-picker': '1998-03-25',
  'date-range': {
    start: '2020-02-06',
    end: '2020-02-10',
  },
  time: '04:45',
  month: '2020-02-06',
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
  dropZone: [],
};

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

export const FormBase = ({ ...args }) => {
  const [values, setValues] = React.useState<any>();

  return (
    <>
      <Form
        onSubmit={(e) => {
          setValues(e);
          console.log(e);
        }}
        formOptions={{ defaultValues: defaultValBase }}
        {...args}
      >
        <FormLayout>
          <Input name="text" label="Name" />
          <Select name="select" label="Select Period" options={options} />
          <RangeSlider name="range" label="Budget" prefix={<p>$</p>} />
          <Checkbox name="checkbox"> I agree to T&C</Checkbox>
          <Switch name="switch" label="Enable Notifications" />
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
            <TimeField name="time" label="Choose Time" />
            <MonthPicker name="month" label="Choose Month" />
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
          <DropFile />

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
    const defaultOptions = { ...defaultValBase };
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
        switch: false,
        'checkbox-group': [],
        radio: '',
        date: dateParser(today(getLocalTimeZone())),
        'date-picker': dateParser(today(getLocalTimeZone())),
        'date-range': {
          start: dateParser(today(getLocalTimeZone())),
          end: dateParser(today(getLocalTimeZone())),
        },
        time: '00:00',
        month: dateParser(today(getLocalTimeZone())),
        comboboxMulti: [],
        combobox: '',
        dropZone: [],
      }}
    />
  );
};

function dateParser(date: { day: number; month: number; year: number }) {
  function pad(n: number) {
    return n < 10 ? `0${n}` : n;
  }

  return `${date.year}-${pad(date.month)}-${pad(date.day)}`;
}

const DropFile = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleDropZoneDrop = React.useCallback(
    (_dropFiles: File[], acceptedFiles: File[]) => {
      setFiles((files) => [...files, ...acceptedFiles]);
    },
    []
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: '0' }}>
      <div className="flex flex-col gap-2">
        {files.map((file, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : IconFile
              }
            />

            <div>
              {file.name}{' '}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <DropZone name="dropZone" onDrop={handleDropZoneDrop} label="Upload files">
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
};

export const DynamicElements = () => {
  const metadata = [
    {
      id: '1',
      label: 'Source',
      dataStandard: 'DCATV3',
      urn: '', // since this is empty, it will be ignored in the submit data
      dataType: 'STRING',
      options: '',
      validator: '',
      type: 'REQUIRED',
      model: 'DATASET',
      enabled: true,
    },
    {
      id: '2',
      label: 'source',
      dataStandard: '',
      urn: 'dataset:source',
      dataType: 'STRING',
      options: '',
      validator: '',
      type: 'REQUIRED',
      model: 'DATASET',
      enabled: false,
    },
    {
      id: '3',
      label: 'source',
      dataStandard: '',
      urn: 'dcatv2:source',
      dataType: 'STRING',
      options: '',
      validator: '',
      type: 'REQUIRED',
      model: 'DATASET',
      enabled: true,
    },
    {
      id: '4',
      label: 'location',
      dataStandard: '',
      urn: 'dataset:location',
      dataType: 'STRING',
      options: '',
      validator: '',
      type: 'REQUIRED',
      model: 'DATASET',
      enabled: true,
    },
    {
      id: '5',
      label: 'Update',
      dataStandard: '',
      urn: 'dataset:update',
      dataType: 'STRING',
      options: '',
      validator: '',
      type: 'REQUIRED',
      model: 'DATASET',
      enabled: true,
    },
    {
      id: '6',
      label: 'Licence',
      dataStandard: '',
      urn: 'dataset:licence',
      dataType: 'STRING',
      options: '',
      validator: '',
      type: 'REQUIRED',
      model: 'DATASET',
      enabled: true,
    },
  ];

  return (
    <Form
      onSubmit={(e) => {
        console.log(e);
      }}
    >
      <FormLayout>
        {metadata.map((field) => {
          if (field.dataType === 'STRING') {
            return (
              <Input
                key={field.id}
                name={field.urn}
                label={field.label}
                required={field.type === 'REQUIRED'}
                disabled={!field.enabled}
              />
            );
          }
          return null;
        })}
        <Button submit size="slim">
          Submit
        </Button>
      </FormLayout>
    </Form>
  );
};

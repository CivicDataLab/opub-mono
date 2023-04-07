import { parseDate } from '@internationalized/date';
import {
  Box,
  Button,
  Divider,
  Flex,
  Form,
  FormLayout,
  Icon,
  Text,
} from '@opub-cdl/ui/src';
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';
import React from 'react';
import styles from '../styles/pages/home.module.scss';

export default function Web() {
  const [values, setValues] = React.useState<any>();

  const defVal = '2020-02-03';

  const defaultValBase = {
    text: 'Excalibur',
    select: 'yesterday',
    range: [6],
    checkbox: true,
    'checkbox-group': ['angular', 'vue'],
    radio: '1',
    date: defVal,
    'date-picker': '1998-03-25',
  };

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

  const options = [
    {
      label: 'Increase',
      value: 'Increase',
      prefix: <Icon source={ChevronUpMinor} />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
      prefix: <Icon source={ChevronDownMinor} />,
    },
  ];

  return (
    <div className={styles.container}>
      <Text variant="heading2xl" as="h1">
        Form
      </Text>

      <Spacer heading="Form">
        <Form
          onSubmit={(e: any) => setValues(e)}
          formOptions={{ defaultValues: defaultValBase }}
        >
          <FormLayout>
            <Form.Input name="text" label="Name" />
            <Form.Select
              name="select"
              label="Select Period"
              options={options}
            />
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
              <Form.DateField name="date" label="Choose Date" />
              <Form.DatePicker
                name="date-picker"
                label="Choose Date with Picker"
                defaultValue={parseDate('1998-03-25')}
              />
            </FormLayout.Group>

            <Button submit size="slim">
              Submit
            </Button>
          </FormLayout>
        </Form>
      </Spacer>
    </div>
  );
}

const Spacer = ({ children, heading, divider }: any) => {
  return (
    <Box paddingBlockStart="8" paddingBlockEnd="4" width="fit-content">
      <Box paddingBlockEnd="2">
        <Text variant="headingLg" as="h2">
          {heading}
        </Text>
      </Box>
      <Flex alignItems="start" gap={16} wrap="wrap">
        {children}
      </Flex>
      {divider && <Divider borderStyle="divider" />}
    </Box>
  );
};

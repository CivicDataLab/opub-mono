import React from 'react';
import { EditDatasetProps } from '@/types';
import {
  Box,
  ComboboxMulti,
  DatePicker,
  Divider,
  Form,
  FormLayout,
  Input,
  Select,
  Text,
} from '@opub-cdl/ui';

import styles from '../edit.module.scss';

export function EditMetadata({ defaultVal }: { defaultVal: EditDatasetProps }) {
  const [val, setVal] = React.useState(defaultVal);

  return (
    <Box paddingBlockStart="6" maxWidth="944px">
      <Form
        onSubmit={() => console.log(val)}
        onChange={setVal}
        formOptions={{ defaultValues: defaultVal }}
      >
        <div className={styles.EditDataset}>
          <div className="flex flex-col gap-1">
            <Text variant="headingMd">Add Metadata</Text>
            <Text variant="bodyMd" color="subdued">
              Source, Date of Creation, Update Frequency, etc.
            </Text>
          </div>
          <div className="my-4">
            <Divider />
          </div>

          <Box paddingBlockStart="3">
            <FormLayout>
              <FormLayout.Group>
                <Input
                  name="source"
                  label="Source"
                  placeholder="example: https://data.gov.in"
                  maxLength={30}
                  showCharacterCount
                />
                <Select
                  name="frequency"
                  label="Update Frequency"
                  options={[
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                  ]}
                  placeholder="Select an option"
                />
              </FormLayout.Group>

              <DatePicker name="created" label="Date of Creation" />
              <Box maxWidth="480px">
                <ComboboxMulti
                  name="tags"
                  label="Tags"
                  placeholder="Search Tags"
                  defaultList={[
                    'Banana',
                    'Broccoli',
                    'Burger',
                    'Cake',
                    'Candy',
                    'Carrot',
                  ]}
                  verticalContent
                />
              </Box>
            </FormLayout>
          </Box>
        </div>
      </Form>
    </Box>
  );
}

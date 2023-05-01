import { EditDatasetProps } from '@/types';
import {
  Box,
  ComboboxMulti,
  DatePicker,
  Form,
  FormLayout,
  Input,
  Select,
  Text,
} from '@opub-cdl/ui/src';

import styles from '../edit.module.scss';

export function EditMetadata({ defaultVal }: { defaultVal: EditDatasetProps }) {
  return (
    <Box paddingBlockStart="6" maxWidth="944px">
      <Form
        onSubmit={(e) => console.log(e)}
        formOptions={{ defaultValues: defaultVal }}
      >
        <div className={styles.EditDataset}>
          <Text variant="headingMd">Add Metadata</Text>

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
                <DatePicker name="created" label="Date of Creation" />
              </FormLayout.Group>
              <FormLayout.Group>
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
              </FormLayout.Group>
            </FormLayout>
          </Box>
        </div>
      </Form>
    </Box>
  );
}

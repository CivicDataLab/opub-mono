import React from 'react';
import { useRouter } from 'next/navigation';
import { EditDatasetProps } from '@/types';
import {
  Box,
  ComboboxMulti,
  DatePicker,
  Divider,
  FormLayout,
  Input,
  Select,
  Text,
} from '@opub-cdl/ui';

import { DatasetForm } from '../../../components/dataset-form';
import styles from '../edit.module.scss';

export function EditMetadata({
  id,
  defaultVal,
  submitRef,
}: {
  id: string;
  defaultVal: EditDatasetProps;
  submitRef: React.RefObject<HTMLButtonElement>;
}) {
  const [val, setVal] = React.useState(defaultVal);
  const router = useRouter();

  return (
    <Box paddingBlockStart="6" maxWidth="944px">
      <DatasetForm
        onSubmit={() => {
          router.push(`/dashboard/dataset/${id}/edit/distribution`);
        }}
        formOptions={{ defaultValues: defaultVal }}
        onChange={setVal}
        submitRef={submitRef}
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
                  autoComplete="off"
                  required
                  error="This field is required"
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
                  required
                  error="This field is required"
                />
              </FormLayout.Group>

              <DatePicker
                name="created"
                label="Date of Creation"
                required
                error="This field is required"
              />
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
                  required
                  error="This field is required"
                />
              </Box>
            </FormLayout>
          </Box>
        </div>
      </DatasetForm>
    </Box>
  );
}

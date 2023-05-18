import React from 'react';
import { UpdateDatasetInput } from '@/gql/generated/graphql';
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
  defaultVal,
  submitRef,
  isLoading,
  mutate,
}: {
  id: string;
  defaultVal: UpdateDatasetInput;
  submitRef: React.RefObject<HTMLButtonElement>;
  isLoading: boolean;
  mutate: (res: { dataset_data: UpdateDatasetInput }) => void;
}) {
  return (
    <Box paddingBlockStart="6" maxWidth="944px">
      <DatasetForm
        onSubmit={(value: UpdateDatasetInput) => {
          mutate({
            dataset_data: {
              id: defaultVal.id,
              source: value.source,
              update_frequency: value.update_frequency,
              tags_list: value.tags_list,
              remote_issued: value.remote_issued,
            },
          });
        }}
        formOptions={{ defaultValues: defaultVal }}
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
                  readOnly={isLoading}
                />
                <Select
                  name="update_frequency"
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
                  disabled={isLoading}
                />
              </FormLayout.Group>

              <DatePicker
                name="remote_issued"
                label="Date of Creation"
                required
                error="This field is required"
                isDisabled={isLoading}
              />
              <Box maxWidth="480px">
                <ComboboxMulti
                  name="tags_list"
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
                  readOnly={isLoading}
                />
              </Box>
            </FormLayout>
          </Box>
        </div>
      </DatasetForm>
    </Box>
  );
}

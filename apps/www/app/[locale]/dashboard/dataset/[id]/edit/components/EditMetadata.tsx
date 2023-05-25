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
                <Select
                  name="update_frequency"
                  label="Update Frequency"
                  helpText="How often is this dataset updated?"
                  options={[
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                  ]}
                  placeholder="Select"
                  required
                  error="This field is required"
                  disabled={isLoading}
                />
                <Select
                  name="language"
                  label="Language"
                  helpText="What language is this dataset in?"
                  options={[
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                  ]}
                  placeholder="Select"
                  required
                  error="This field is required"
                  disabled={isLoading}
                />
              </FormLayout.Group>

              <FormLayout.Group>
                <ComboboxMulti
                  name="geography"
                  label="Geography"
                  helpText="Which geography does this data belong to?"
                  placeholder="Search Locations"
                  defaultList={['United States', 'Canada', 'Mexico', 'India']}
                  verticalContent
                  required
                  error="This field is required"
                  readOnly={isLoading}
                />
                <ComboboxMulti
                  name="tags_list"
                  label="Tags"
                  placeholder="Search Tags"
                  helpText="Any other tags or keywords that can help people discover your dataset"
                  defaultList={[
                    'Health',
                    'Education',
                    'Transportation',
                    'Economy',
                    'Demographics',
                    'Environment',
                  ]}
                  verticalContent
                  required
                  error="This field is required"
                  readOnly={isLoading}
                />
              </FormLayout.Group>
            </FormLayout>
          </Box>
        </div>
      </DatasetForm>
    </Box>
  );
}

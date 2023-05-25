import React from 'react';
import { UpdateDatasetInput } from '@/gql/generated/graphql';
import {
  Button,
  ComboboxMulti,
  Divider,
  FormLayout,
  Select,
  Text,
} from '@opub-cdl/ui';

import { DatasetForm } from '../../../components/dataset-form';
import styles from '../edit.module.scss';

interface DefaultValues extends Omit<UpdateDatasetInput, 'geo_list'> {
  geo_list: string[];
}

export function EditMetadata({
  defaultVal,
  submitRef,
  isLoading,
  mutate,
}: {
  id: string;
  defaultVal: DefaultValues;
  submitRef: React.RefObject<HTMLButtonElement>;
  isLoading: boolean;
  mutate: (res: { dataset_data: UpdateDatasetInput }) => void;
}) {
  return (
    <>
      <DatasetForm
        onSubmit={(value: UpdateDatasetInput) => {
          mutate({
            dataset_data: {
              id: defaultVal.id,
              update_frequency: value.update_frequency,
              tags_list: value.tags_list,
              geo_list: value.geo_list,
              language: value.language,
              source: '',
            },
          });
        }}
        formOptions={{ defaultValues: defaultVal }}
        submitRef={submitRef}
      >
        <div className={styles.EditDataset}>
          <div className="flex flex-col gap-1">
            <Text variant="headingMd">Add Metadata</Text>
          </div>
          <div className="my-4">
            <Divider />
          </div>

          <div className="pt-3">
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
                    { label: 'English', value: 'english' },
                    { label: 'Hindi', value: 'hindi' },
                    { label: 'Spanish', value: 'spanish' },
                    { label: 'French', value: 'french' },
                  ]}
                  placeholder="Select"
                  required
                  error="This field is required"
                  disabled={isLoading}
                />
              </FormLayout.Group>

              <FormLayout.Group>
                <ComboboxMulti
                  name="geo_list"
                  label="Geography"
                  // helpText="Which geography does this data belong to?"
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
                  // helpText="Any other tags or keywords that can help people discover your dataset"
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
          </div>
          <div className="mt-8">
            <Divider />
          </div>
          <div className="mt-4 flex items-center gap-2 justify-center flex-wrap">
            <Button>Save & Exit</Button>
            <Button primary submit>
              Save & Proceed
            </Button>
          </div>
        </div>
      </DatasetForm>
    </>
  );
}

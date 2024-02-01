import React from 'react';
import { UpdateDatasetInput } from '@/gql/generated/graphql';
import { Button, Combobox, Divider, FormLayout, Select, Text } from 'opub-ui';

import { DatasetForm } from '../../../components/dataset-form';

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
              remote_issued: '',
              sector_list: [],
            },
          });
        }}
        formOptions={{ defaultValues: defaultVal }}
        submitRef={submitRef}
      >
        <>
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
                <Combobox
                  name="geo_list"
                  label="Geography"
                  // helpText="Which geography does this data belong to?"
                  placeholder="Search Locations"
                  list={['United States', 'Canada', 'Mexico', 'India']}
                  displaySelected
                  required
                  error="This field is required"
                />
                <Combobox
                  name="tags_list"
                  label="Tags"
                  placeholder="Search Tags"
                  // helpText="Any other tags or keywords that can help people discover your dataset"
                  list={[
                    'Health',
                    'Education',
                    'Transportation',
                    'Economy',
                    'Demographics',
                    'Environment',
                  ]}
                  displaySelected
                  required
                  error="This field is required"
                />
              </FormLayout.Group>
            </FormLayout>
          </div>
          <div className="mt-8">
            <Divider />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Button>Save & Exit</Button>
            <Button submit>Save & Proceed</Button>
          </div>
        </>
      </DatasetForm>
    </>
  );
}

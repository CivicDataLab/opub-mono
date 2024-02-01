import React from 'react';
import { graphql } from '@/gql';
import { FileInputType, ResourceInput } from '@/gql/generated/graphql';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Divider,
  DropZone,
  FormLayout,
  Icon,
  Input,
  Select,
  Text,
} from 'opub-ui';

import { GraphQL } from '@/lib/api';
import { bytesToSize } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { DatasetForm } from '../../../components/dataset-form';

const createResourceMutationDoc: any = graphql(`
  mutation createResourceMutation($resource_data: ResourceInput) {
    create_resource(resource_data: $resource_data) {
      success
      errors
      resource {
        id
        title
        description
        file_details {
          resource {
            id
            title
            description
          }
          format
          file
          remote_url
          source_file_name
        }
      }
    }
  }
`);

interface Props {
  id: string;
  defaultVal: {
    id: string;
    resources: {
      title: string;
      description: string;
      file_details?: any;
    }[];
  };
  submitRef: React.RefObject<HTMLButtonElement>;
  setPage: (page: 'list' | 'create') => void;
}

export function EditDistribution({
  id,
  defaultVal,
  submitRef,
  setPage,
}: Props) {
  // const [val, setVal] = React.useState(defaultVal);
  const [fileSelected, setFileSelected] = React.useState(false);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data: { resource_data: ResourceInput }) =>
      GraphQL(createResourceMutationDoc, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`dataset_distribution_${id}`],
        });
      },
    }
  );

  return (
    <>
      <DatasetForm
        onSubmit={async (data: {
          title: string;
          description: string;
          file_details: FileInputType['file'];
        }) => {
          mutate({
            resource_data: {
              dataset: defaultVal.id,
              status: 'DRAFT',
              title: data.title,
              description: data.description,
              file_details: {
                file: data.file_details[0],
              },
            },
          });
        }}
        formOptions={{ defaultValues: defaultVal }}
        submitRef={submitRef}
        // onChange={setVal}
      >
        <>
          <Text variant="headingMd">Add Distribution</Text>
          <div className="pt-4">
            <Divider />
          </div>

          <div className="pt-4">
            <FormLayout>
              <FileUpload
                disabled={isLoading}
                required
                error="This field is required"
                setFileSelected={setFileSelected}
              />
              <Input
                name="url"
                label="OR enter URL:"
                placeholder="link to your file"
                prefix={<Icon source={Icons.link} />}
                error="This field is required"
                readOnly={isLoading}
                disabled={fileSelected}
              />
              <FormLayout.Group>
                <FormLayout>
                  <Input
                    name="title"
                    label="Name of Distribution"
                    maxLength={30}
                    showCharacterCount
                    autoComplete="off"
                    required
                    error="This field is required"
                    readOnly={isLoading}
                  />
                  <Select
                    name="language"
                    label="Language"
                    required
                    error="This field is required"
                    disabled={isLoading}
                    helpText="Which language is the distribution in?"
                    options={[
                      { label: 'English', value: 'en' },
                      { label: 'Hindi', value: 'hi' },
                      { label: 'French', value: 'fr' },
                    ]}
                  />
                </FormLayout>
                <Input
                  name="description"
                  label="Description"
                  maxLength={300}
                  multiline={3}
                  showCharacterCount
                  autoComplete="off"
                  required
                  error="This field is required"
                  readOnly={isLoading}
                />
              </FormLayout.Group>
            </FormLayout>
          </div>
          <div className="pt-6">
            <Divider />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <Button onClick={() => setPage('list')}>Cancel</Button>
            <div className="flex flex-wrap items-center gap-4">
              <Button loading={isLoading}>Save & Finish</Button>
              <Button loading={isLoading}>Save & Add Another</Button>
            </div>
          </div>
        </>
      </DatasetForm>
    </>
  );
}

const FileUpload = ({
  required,
  error,
  disabled,
  setFileSelected,
}: {
  required?: boolean;
  error?: string;
  disabled?: boolean;
  setFileSelected: (val: boolean) => void;
}) => {
  const [file, setFile] = React.useState<File>();

  const handleDropZoneDrop = React.useCallback(
    (_dropFiles: File[], acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
      setFileSelected(true);
    },
    [setFileSelected]
  );

  function handleFileDelete(props: React.MouseEvent<HTMLButtonElement>) {
    props.stopPropagation();
    setFileSelected(false);
    setFile(undefined);
  }

  const hint = (
    <Text variant="bodySm" as="p" color="subdued">
      Supported file type: .pdf, .csv, .xls <br />
      The file size should not be more than 5 MB
    </Text>
  );

  const fileUpload = !file && <DropZone.FileUpload actionHint={hint} />;
  const uploadedFile = file && (
    <div className="flex h-full items-center justify-center py-16">
      <div className="surfaceDefault flex items-center gap-3 rounded-05 px-3 py-2">
        <Icon source={Icons.check} size={24} color="success" />

        <div className="flex flex-col">
          <div className="max-w-[180px]">
            <Text variant="headingMd" truncate>
              {file.name}
            </Text>
          </div>
          <Text variant="bodyMd" color="subdued">
            {bytesToSize(file.size)}
          </Text>
        </div>
        <Button
          size="slim"
          icon={<Icon source={Icons.delete} size={24} />}
          kind="tertiary"
          accessibilityLabel="delete resource"
          onClick={handleFileDelete}
        />
      </div>
    </div>
  );

  return (
    <DropZone
      name="file_details"
      required={required}
      errorOverlayText={error}
      allowMultiple={false}
      label="Upload"
      onChange={handleDropZoneDrop}
      disabled={disabled}
      labelHidden
    >
      {uploadedFile}
      {fileUpload}
    </DropZone>
  );
};

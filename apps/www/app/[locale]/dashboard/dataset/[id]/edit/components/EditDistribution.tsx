import React from 'react';
import { FileInputType, ResourceInput } from '@/gql/generated/graphql';
import {
  Box,
  Divider,
  DropZone,
  FormLayout,
  Input,
  Text,
  Thumbnail,
} from '@opub-cdl/ui';

import { Icons } from '@/components/icons';
import { DatasetForm } from '../../../components/dataset-form';
import styles from '../edit.module.scss';

export function EditDistribution({
  defaultVal,
  submitRef,
  isLoading,
  mutate,
}: {
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
  isLoading: boolean;
  mutate: (res: { resource_data: ResourceInput }) => void;
}) {
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
      >
        <div className={styles.EditDataset}>
          <div className="flex flex-col gap-1">
            <Text variant="headingMd">Add Distribution</Text>
            <Text variant="bodyMd" color="subdued">
              Upload files and add details
            </Text>
          </div>
          <div className="my-4">
            <Divider />
          </div>

          <Box paddingBlockStart="3">
            <FormLayout>
              <FileUpload
                disabled={isLoading}
                required
                error="This field is required"
              />
              <Input
                name="title"
                label="Title"
                maxLength={30}
                showCharacterCount
                autoComplete="off"
                required
                error="This field is required"
                readOnly={isLoading}
              />
              <Input
                name="description"
                label="Description"
                maxLength={300}
                multiline={4}
                showCharacterCount
                autoComplete="off"
                required
                error="This field is required"
                readOnly={isLoading}
              />
            </FormLayout>
          </Box>
        </div>
      </DatasetForm>
    </>
  );
}

const FileUpload = ({
  required,
  error,
  disabled,
}: {
  required?: boolean;
  error?: string;
  disabled?: boolean;
}) => {
  const [file, setFile] = React.useState<File>();

  const handleDropZoneDrop = React.useCallback(
    (_dropFiles: File[], acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    []
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const hint = (
    <Text variant="bodySm" as="p" color="subdued">
      Supported file type: .pdf, .csv, .xls <br />
      The file size should not be more than 5 MB
    </Text>
  );

  const fileUpload = !file && <DropZone.FileUpload actionHint={hint} />;
  const uploadedFile = file && (
    <Box padding="8">
      <Box
        flex
        gap="2"
        alignItems="center"
        justifyContent="center"
        minHeight="164px"
      >
        <Thumbnail
          size="small"
          alt={file.name}
          source={
            validImageTypes.includes(file.type)
              ? window.URL.createObjectURL(file)
              : Icons.dropzone
          }
        />

        <div>
          <Text variant="bodySm" as="p">
            {file.name}
          </Text>{' '}
          <Text variant="bodySm" as="p">
            {file.size} bytes
          </Text>
        </div>
      </Box>
    </Box>
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
    >
      {uploadedFile}
      {fileUpload}
    </DropZone>
  );
};

import React from 'react';
import { EditDistributionProps } from '@/types';
import {
  Box,
  Divider,
  DropZone,
  FormLayout,
  Input,
  Text,
  Thumbnail,
} from '@opub-cdl/ui/src';
import { IconFile } from '@tabler/icons-react';

import { DatasetForm } from '../../../components/dataset-form';
import styles from '../edit.module.scss';

export function EditDistribution({
  defaultVal,
  submitRef,
}: {
  defaultVal: EditDistributionProps;
  submitRef: React.RefObject<HTMLButtonElement>;
}) {
  const [val, setVal] = React.useState(defaultVal);

  return (
    <Box paddingBlockStart="6" maxWidth="944px">
      <DatasetForm
        onSubmit={() => {
          alert('form submitted');
        }}
        formOptions={{ defaultValues: defaultVal }}
        onChange={setVal}
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
              <FileUpload required error="This field is required" />
              <Input
                name="title"
                label="Title"
                maxLength={30}
                showCharacterCount
                autoComplete="off"
                required
                error="This field is required"
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
              />
            </FormLayout>
          </Box>
        </div>
      </DatasetForm>
    </Box>
  );
}

const FileUpload = ({
  required,
  error,
}: {
  required?: boolean;
  error?: string;
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
              : IconFile
          }
        />

        <div>
          {file.name}{' '}
          <Text variant="bodySm" as="p">
            {file.size} bytes
          </Text>
        </div>
      </Box>
    </Box>
  );

  return (
    <DropZone
      name="file"
      required={required}
      errorOverlayText={error}
      allowMultiple={false}
      label="Upload"
      onChange={handleDropZoneDrop}
    >
      {uploadedFile}
      {fileUpload}
    </DropZone>
  );
};

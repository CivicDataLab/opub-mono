import { FileMinor } from '@shopify/polaris-icons';
import { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Thumbnail } from '../Thumbnail';
import { DropZone } from './DropZone';

/**
 * The drop zone component lets users upload files by dragging and dropping the files into an area on a page, or activating a button.
 *
 * Reference: https://polaris.shopify.com/components/selection-and-input/drop-zone
 */
const meta = {
  component: DropZone,
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDropZoneDrop = useCallback(
      (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
        setFiles((files) => [...files, ...acceptedFiles]);
      },
      []
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !files.length && <DropZone.FileUpload />;
    const uploadedFiles = files.length > 0 && (
      <div style={{ padding: '0' }}>
        <Flex direction="column" gap={8}>
          {files.map((file, index) => (
            <Flex alignItems="center" gap={8} key={index}>
              <Thumbnail
                size="small"
                alt={file.name}
                source={
                  validImageTypes.includes(file.type)
                    ? window.URL.createObjectURL(file)
                    : FileMinor
                }
              />

              <div>
                {file.name}{' '}
                <Text variant="bodySm" as="p">
                  {file.size} bytes
                </Text>
              </div>
            </Flex>
          ))}
        </Flex>
      </div>
    );

    return (
      <DropZone onDrop={handleDropZoneDrop} {...args}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    );
  },
};

export const Label: Story = {
  ...Default,
  args: {
    label: 'Files',
  },
};

export const SingleUpload: Story = {
  render: ({ ...args }) => {
    const [file, setFile] = useState<File>();

    const handleDropZoneDrop = useCallback(
      (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
        setFile(acceptedFiles[0]);
      },
      []
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !file && <DropZone.FileUpload />;
    const uploadedFiles = file && (
      <Flex alignItems="center" gap={8}>
        <Thumbnail
          size="small"
          alt={file.name}
          source={
            validImageTypes.includes(file.type)
              ? window.URL.createObjectURL(file)
              : FileMinor
          }
        />

        <div>
          {file.name}{' '}
          <Text variant="bodySm" as="p">
            {file.size} bytes
          </Text>
        </div>
      </Flex>
    );

    return (
      <DropZone onDrop={handleDropZoneDrop} {...args}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    );
  },
  args: {
    label: 'Single Upload',
    allowMultiple: false,
  },
};

export const Medium: Story = {
  render: ({ ...args }) => (
    <div style={{ width: 114, height: 114 }}>
      <DropZone {...args}>
        <DropZone.FileUpload />
      </DropZone>
    </div>
  ),
  args: {
    label: 'Medium',
  },
};

export const Small: Story = {
  render: ({ ...args }) => (
    <div style={{ width: 50, height: 50 }}>
      <DropZone {...args}>
        <DropZone.FileUpload />
      </DropZone>
    </div>
  ),
  args: {
    label: 'Small',
  },
};

export const CustomHint: Story = {
  render: ({ ...args }) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDropZoneDrop = useCallback(
      (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
        setFiles((files) => [...files, ...acceptedFiles]);
      },
      []
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !files.length && (
      <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
    );
    const uploadedFiles = files.length > 0 && (
      <div style={{ padding: '0' }}>
        <Flex direction="column" gap={8}>
          {files.map((file, index) => (
            <Flex alignItems="center" gap={8} key={index}>
              <Thumbnail
                size="small"
                alt={file.name}
                source={
                  validImageTypes.includes(file.type)
                    ? window.URL.createObjectURL(file)
                    : FileMinor
                }
              />

              <div>
                {file.name}{' '}
                <Text variant="bodySm" as="p">
                  {file.size} bytes
                </Text>
              </div>
            </Flex>
          ))}
        </Flex>
      </div>
    );

    return (
      <DropZone onDrop={handleDropZoneDrop} {...args}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    );
  },
  args: {
    variableHeight: true,
  },
};

export const CustomTrigger: Story = {
  render: ({ ...args }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [openFileDialog, setOpenFileDialog] = useState(false);

    const handleDropZoneDrop = useCallback(
      (dropFiles: File[], _acceptedFiles: File[], _rejectedFiles: File[]) =>
        setFiles((files) => [...files, ...dropFiles]),
      []
    );
    const toggleOpenFileDialog = useCallback(
      () => setOpenFileDialog((openFileDialog) => !openFileDialog),
      []
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !files.length && (
      <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
    );
    const uploadedFiles = files.length > 0 && (
      <div style={{ padding: '0' }}>
        <Flex direction="column" gap={8}>
          {files.map((file, index) => (
            <Flex alignItems="center" gap={8} key={index}>
              <Thumbnail
                size="small"
                alt={file.name}
                source={
                  validImageTypes.includes(file.type)
                    ? window.URL.createObjectURL(file)
                    : FileMinor
                }
              />

              <div>
                {file.name}{' '}
                <Text variant="bodySm" as="p">
                  {file.size} bytes
                </Text>
              </div>
            </Flex>
          ))}
        </Flex>
      </div>
    );

    return (
      <Flex direction="column" alignItems="start" gap={8}>
        <Button plain removeUnderline onClick={toggleOpenFileDialog}>
          Upload Image
        </Button>
        <DropZone
          openFileDialog={openFileDialog}
          onDrop={handleDropZoneDrop}
          onFileDialogClose={toggleOpenFileDialog}
        >
          {fileUpload}
          {uploadedFiles}
        </DropZone>
      </Flex>
    );
  },
  args: {
    variableHeight: true,
  },
};

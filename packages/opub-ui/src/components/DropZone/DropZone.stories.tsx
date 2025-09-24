import { useCallback, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { IconFile } from '@tabler/icons-react';

import { Button } from '../Button';
import { Text } from '../Text';
import { Thumbnail } from '../Thumbnail';
import { DropZone } from './DropZone';

/**
 * The drop zone component lets users upload files by dragging and dropping the files into an area on a page, or activating a button.
 *
 * Reference: https://polaris.shopify.com/components/selection-and-input/drop-zone
 */
const meta = {
  title: 'Components/DropZone',
  component: DropZone,
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDropZoneDrop = useCallback(
      (_dropFiles: File[], acceptedFiles: File[]) => {
        setFiles((files) => [...files, ...acceptedFiles]);
      },
      []
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !files.length && <DropZone.FileUpload />;
    const uploadedFiles = files.length > 0 && (
      <div style={{ padding: '0' }}>
        <div className="flex flex-col gap-2">
          {files.map((file, index) => (
            <div className="flex items-center gap-2" key={index}>
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
            </div>
          ))}
        </div>
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
      (_dropFiles: File[], acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
      },
      []
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !file && <DropZone.FileUpload />;
    const uploadedFiles = file && (
      <div className="flex items-center gap-2">
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
      (_dropFiles: File[], acceptedFiles: File[]) => {
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
        <div className="flex flex-col gap-2">
          {files.map((file, index) => (
            <div className="flex items-center gap-2" key={index}>
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
            </div>
          ))}
        </div>
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
      (dropFiles: File[]) => setFiles((files) => [...files, ...dropFiles]),
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
        <div className="flex flex-col gap-2">
          {files.map((file, index) => (
            <div className="flex items-center gap-2" key={index}>
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
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="flex flex-col items-start gap-2">
        <Button kind="tertiary" removeUnderline onClick={toggleOpenFileDialog}>
          Upload Image
        </Button>
        <DropZone
          openFileDialog={openFileDialog}
          onDrop={handleDropZoneDrop}
          onFileDialogClose={toggleOpenFileDialog}
          {...args}
        >
          {fileUpload}
          {uploadedFiles}
        </DropZone>
      </div>
    );
  },
  args: {
    variableHeight: true,
  },
};

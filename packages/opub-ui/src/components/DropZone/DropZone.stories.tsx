import { Asset } from '@opub-icons/workflow';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { Flex } from '../Flex';
import { Text } from '../Text';
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

export function Default() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    []
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: '0' }}>
      <Flex direction="column" gap={8}>
        {files.map((file, index) => (
          <Flex alignItems="center" gap={8} key={index}>
            {validImageTypes.includes(file.type) ? (
              <img
                width={40}
                height={40}
                alt={file.name}
                src={window.URL.createObjectURL(file)}
              />
            ) : (
              <Asset />
            )}

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
    <DropZone onDrop={handleDropZoneDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}

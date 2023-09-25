import { formatDate } from '@/lib/utils';
import { Button, ButtonGroup, Text } from 'opub-ui';

export const DatasetResources = ({
  fileName,
  size,
  modified,
}: {
  fileName: string;
  size: Number;
  modified: string;
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <Text fontWeight="semibold">{fileName}</Text>
        <Text>Updated : {formatDate(modified)}</Text>
      </div>
      <Text>{size.toString()}</Text>
      <ButtonGroup>
        <Button>Preview File</Button>
        <Button primary>Download File</Button>
      </ButtonGroup>
    </div>
  );
};

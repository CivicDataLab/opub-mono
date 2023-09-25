import { Button, ButtonGroup, Text } from 'opub-ui';

export interface ResourceData {
  fileName?: string;
  size?: string;
  updated?: string;
}

export const DatasetResources = ({
  resources,
}: {
  resources?: ResourceData[];
}) => {
  return resources?.map(
    (resource) =>
      resource?.fileName && (
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <Text fontWeight="semibold">{resource?.fileName ?? 'NA'}</Text>
            <Text>Updated : {resource?.updated || 'NA'}</Text>
          </div>
          <Text>{resource?.size || 'NA'}</Text>
          <ButtonGroup>
            <Button>Preview File</Button>
            <Button primary>Download File</Button>
          </ButtonGroup>
        </div>
      )
  );
};

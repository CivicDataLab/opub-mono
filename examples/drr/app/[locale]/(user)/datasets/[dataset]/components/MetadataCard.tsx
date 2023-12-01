import { Separator, Tag, Text } from 'opub-ui';

export interface Metadata {
  lastUpdated: string;
  updateFrequency: string;
  fileTypes?: string[];
  tags: string[];
  licenses: (string | 'NA')[];
}

export function MetadataCard({
  lastUpdated,
  updateFrequency,
  fileTypes,
  tags,
  licenses,
}: Metadata) {
  return (
    <div className="py-4 px-6 shadow-card shadow-basicSm bg-surface rounded-1 shadow-card flex flex-col gap-5 shrink-0 basis-[350px]">
      <Text fontWeight="semibold">Metadata</Text>
      <dl>
        <DataList label={'Last Updated'} value={lastUpdated || 'NA'} />
        <DataList label={'Update Frequency'} value={updateFrequency || 'NA'} />
        <DataList label={'Additional Tags'} value={tags || 'NA'} />
        <DataList label={'File types'} value={fileTypes || 'NA'} />
        <DataList label={'Licenses'} value={licenses || 'NA'} />
      </dl>
    </div>
  );
}

export const DataList = ({
  label,
  value,
}: {
  label: string;
  value: string[] | string;
}) => {
  return (
    <div>
      <div className="flex gap-4 py-2 border-b-1 border-solid border-borderSubdued">
        <dt className="min-w-[130px]">
          <Text fontWeight="medium" variant="bodyMd">
            {label} :
          </Text>
        </dt>
        <dd className="flex items-center gap-1 flex-wrap">
          {Array.isArray(value) ? (
            value.map((tag, index) => <Tag key={index}>{tag}</Tag>)
          ) : (
            <Text fontWeight="medium" variant="bodyMd">
              {value}
            </Text>
          )}
        </dd>
      </div>
      {/* <Separator className="mt-2" /> */}
    </div>
  );
};

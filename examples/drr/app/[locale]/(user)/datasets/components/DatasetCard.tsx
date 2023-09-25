import React from 'react';
import Link from 'next/link';
import { Tag, Text } from 'opub-ui';

import { DatasetSource, LastUpdated, UpdateFreq } from '@/config/consts';
import { formatDate } from '@/lib/utils';

export interface DataProps {
  title: string;
  source: string;
  description: string;
  lastUpdated: string;
  updateFrequency: string;
  period: string[];
  fileTypes: string[];
  tags: string[];
  slug: string;
}
export const DatasetCard = ({
  title,
  source,
  description,
  lastUpdated,
  updateFrequency,
  fileTypes,
  tags,
  slug,
}: DataProps) => {
  return (
    <div className="p-4 rounded-1 bg-surface shadow-card flex flex-col gap-3">
      <div className="flex gap-4">
        <div
          id="leftContainer"
          className="flex flex-2 flex-col gap-2 text-interactive"
        >
          <Link href={`/datasets/${slug}`}>
            <Text color="inherit" variant="headingXl">
              {title}
            </Text>
          </Link>
          <Text>
            {DatasetSource} : {source}
          </Text>
          <span className="flex">
            <Text>
              {LastUpdated} : {formatDate(lastUpdated)} | {UpdateFreq} : {updateFrequency}
            </Text>
          </span>
          <span className="flex gap-2">
            {fileTypes.length > 0 && fileTypes?.map((fileType, index) => (
              <Tag key={index}>{fileType}</Tag>
            ))}
          </span>
        </div>

        <div id="rightContainer" className="flex flex-3 flex-col gap-2">
          <Text variant="bodyMd">{description}</Text>
          <span className="flex gap-2">
            {tags.length > 0 && tags?.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

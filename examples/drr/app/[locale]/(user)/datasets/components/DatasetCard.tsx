import React from 'react';
// import Link from 'next/link';
import { Button, Tag, Text } from 'opub-ui';

import { DatasetSource } from '@/config/consts.ts';
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
  datasetDownloadLink: string;
}
export const DatasetCard = ({
  title,
  source,
  description,
  fileTypes,
  period,
  tags,
  slug,
  datasetDownloadLink,
}: DataProps) => {
  return (
    <div className=" bg-surfaceDefault p-6 shadow-elementCard rounded-2 flex flex-col gap-4 rounded">
      <div
        id="leftContainer"
        className="flex flex-2 flex-col gap-2 text-interactive items-stretch truncate"
      >
        {/* <Link href={`/datasets/${slug}`}> */}
          <Text
            color="inherit"
            className=" text-textHighlight "
            variant="headingLg"
            fontWeight="semibold"
            truncate
          >
            {title}
          </Text>
        {/* </Link> */}

        <div className="flex items-start gap-4 self-stretch">
          <div className="flex flex-col items-start gap-2 w-96">
            <Text
              color="default"
              className=" text-textDefault "
              variant="headingSm"
              fontWeight="medium"
            >
              {DatasetSource} : {source}
            </Text>
            <span className="flex items-start gap-1">
              <Text
                color="default"
                className=" text-textSubdued "
                variant="bodySm"
                fontWeight="regular"
              >
                {/* {LastUpdated} : {formatDate(lastUpdated)} | {UpdateFreq} :{' '}
                {updateFrequency} */}
                Reference Period : {formatDate(period[0])} to{' '}
                {formatDate(period[1])}
              </Text>
            </span>
            {/* here is the tag code already written, check with ruthvik once */}
            {/* <span className="flex flex-col w-80 p-0 items-start gap-3"> */}
            <span className="flex gap-4 py-1 px-2 items-center">
              {/* <Tag>TAG 1</Tag>
              <Tag>TAG 1</Tag> */}
              {fileTypes?.length > 0 &&
                fileTypes?.map((fileType, index) => (
                  <Tag key={index}>{fileType}</Tag>
                ))}
            </span>
          </div>

          <div className="flex flex-col items-start gap-0.5 w-max ">
            <Text
              variant="bodyMd"
              fontWeight="regular"
              className="w-[500px] whitespace-normal"
            >
              {description}
            </Text>
          </div>
        </div>

        <div
          id="rightContainer"
          className="flex flex-3 flex-col gap-2 items-end"
        >
          {tags?.length > 0 &&
            tags?.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
          <Button className="bg-actionsPrimaryBasicDefault w-[156px] rounded hover:bg-actionsPrimaryBasicDefault">
            <a href={datasetDownloadLink}>Download</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

import Image from 'next/image';
import { Link, Text } from 'opub-ui';

import { DatasetSource } from '@/config/consts';

export const DatasetInfoCard = ({
  title,
  description,
  source,
  homepage,
  logo
}: {
  title: string;
  description: string;
  source: string;
  homepage: string;
  logo:string;

}) => {
  return (
    <div id="dataset-info" className="flex">
      <div className="p-8 bg-surface rounded-1 shadow-card flex grow">
        <div className="flex flex-col gap-2">
          <Text variant="headingLg">{title}</Text>
          <Text fontWeight="semibold">
            {DatasetSource} : {source}
          </Text>
          <Text className="mt-3 mb-3">{description}</Text>
          <Link external url={homepage}>
            Visit Source Website
          </Link>
        </div>
      </div>
      <div className="p-2 flex place-content-center	 place-items-center	 bg-surface rounded-1 shadow-card shrink-0 basis-[350px]">
        <Image
          className="object-contain"
          alt="dataset-icon"
          height={'55'}
          width="211"
          src={logo}
        />
      </div>
    </div>
  );
};

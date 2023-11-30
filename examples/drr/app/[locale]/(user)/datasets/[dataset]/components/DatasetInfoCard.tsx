import Image from 'next/image';
import { Link, Text } from 'opub-ui';
import { IconButton } from 'opub-ui/src';

import { DatasetSource } from '@/config/consts.ts';
import Icons from '@/components/icons';

export const DatasetInfoCard = ({
  title,
  description,
  source,
  homepage,
  logo,
}: {
  title: string;
  description: string;
  source: string;
  homepage: string;
  logo: string;
}) => {
  return (
    <div
      id="dataset-info"
      className="flex p-0 items-center gap-0 self-stretch shadow-basicSm"
    >
      {/* <div className="flex p-0 items-center gap-0 self-stretch shadow-basicSm"> */}
      <div className="pl-5 pt-6 pb-36">
        <IconButton
          color="subdued"
          shadow-drop-shadow
          icon={Icons.iconChevronLeft}
        >
          Left
        </IconButton>
      </div>
      <div className="py-6 pr-8 pl-5 shadow-card flex grow border-r-1 border-solid border-borderDisabled">
        <div className="flex flex-col gap-2 grow">
          <Text variant="headingLg" fontWeight="semibold">
            {title}
          </Text>
          <Text
            variant="headingMd"
            fontWeight="semibold"
            className="text-textSubdued"
          >
            {DatasetSource} : {source}
          </Text>
          <Text className="mt-3 mb-3" variant="bodyMd">
            {description}
          </Text>
          <div className="flex flex-row gap-6">
            <Link external url={homepage}>
              Visit Source Website
              <IconButton color="interactive" size="slim" icon={Icons.link}>
                Share
              </IconButton>
            </Link>
            <Link external url={homepage}>
              Share dataset
              <IconButton
                color="interactive"
                size="slim"
                icon={Icons.iconShare}
              >
                Share
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="p-3 flex place-content-center place-items-center bg-surface rounded-1 shadow-card shrink-0 basis-[350px]">
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

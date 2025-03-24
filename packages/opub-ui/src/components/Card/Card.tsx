import React, { useState } from 'react';
import {
  IconCalendar,
  IconCalendarEvent,
  IconDownload,
  IconWorld,
} from '@tabler/icons-react';

import { Color } from '../../types/icon';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Format } from '../Format/Format';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import { Text } from '../Text';

export interface CardProps {
  imageUrl?: string;
  tag?: string[];
  title: string;
  description?: string;
  date?: string;
  downloads?: string;
  geography?: string;
  sectorLogo?: string;
  publisherLogo?: string;
  variation: 'Collapsed' | 'Expanded';
  iconColor: Color;
  formats?: string[];
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  tag,
  title,
  description,
  date,
  downloads,
  geography,
  sectorLogo,
  publisherLogo,
  variation,
  iconColor,
  formats,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`bg-white border border-gray-200 shadow-md flex flex-col  rounded-4 p-5 shadow-basicLg ${
        variation === 'Collapsed' ? 'max-w-sm gap-4' : 'w-full gap-6'
      }`}
    >
      {imageUrl && variation === 'Collapsed' && (
        <img
          src={imageUrl}
          alt="Card banner"
          className="h-40 w-full rounded-2"
        />
      )}
      <div className=" flex flex-col gap-4">
        <div>
          {tag && variation === 'Collapsed' && (
            <div className="mb-2 flex gap-2">
              {tag.map((item) => (
                <Tag
                  variation="outlined"
                  textColor="#0066CC"
                  borderColor="#FF6B00"
                >
                  {item}
                </Tag>
              ))}
            </div>
          )}
          <Text color="highlight" variant="headingMd">
            {title}
          </Text>
        </div>

        {description && (
          <>
            <Text
              variant="bodySm"
              className={variation !== 'Collapsed' ? 'line-clamp-2 inline' : ''}
            >
              {variation === 'Collapsed'
                ? description.length > 100
                  ? isExpanded
                    ? description
                    : `${description.slice(0, 100)}...`
                  : description
                : description.length > 300
                  ? isExpanded
                    ? description
                    : `${description.slice(0, 300)}...`
                  : description}
              {description.length > (variation === 'Collapsed' ? 100 : 300) && (
                <Button
                  kind="tertiary"
                  size="slim"
                  onClick={toggleDescription}
                  className="text-blue-600 w-fit"
                >
                  {isExpanded ? 'See Less' : 'See More'}
                </Button>
              )}
            </Text>
          </>
        )}

        <div className="flex flex-wrap items-center gap-4">
          {date && (
            <span className="flex items-center gap-1">
              <Icon source={IconCalendarEvent} color={iconColor} size={24} />
              {variation !== 'Collapsed' && (
                <Text variant="bodySm" className=" pr-1">
                  Last Updated :
                </Text>
              )}
              <Text variant="bodySm">{date}</Text>
            </span>
          )}
          {downloads && (
            <span className="flex items-center gap-1">
              <Icon source={IconDownload} color={iconColor} size={24} />
              {variation !== 'Collapsed' && (
                <Text variant="bodySm" className=" pr-1">
                  Downloads :
                </Text>
              )}
              <Text variant="bodySm">{downloads}</Text>
            </span>
          )}
          {geography && (
            <span className="flex items-center gap-1">
              <Icon source={IconWorld} color={iconColor} size={24} />
              {variation !== 'Collapsed' && (
                <Text variant="bodySm" className=" pr-1">
                  Geography :
                </Text>
              )}
              <Text variant="bodySm">{geography}</Text>
            </span>
          )}
        </div>
      </div>
      {(sectorLogo || publisherLogo) && variation === 'Collapsed' && (
        <Divider />
      )}
      <div className=" flex flex-col  gap-3">
        <div
          className={` flex flex-wrap  items-center  ${variation === 'Collapsed' ? 'justify-between' : ' justify-normal'}`}
        >
          {sectorLogo && (
            <div
              className={`flex ${variation === 'Collapsed' ? '' : 'basis-1/2'}  items-center gap-2`}
            >
              <>
                {variation !== 'Collapsed' && (
                  <Text variant="bodySm">Sectors:</Text>
                )}
                <img
                  src={sectorLogo}
                  alt="Publisher Logo"
                  className="h-9 w-9 rounded-6 border-1 border-solid border-baseGraySlateSolid8 p-2 "
                />
              </>
            </div>
          )}
          {publisherLogo && (
            <div className="flex items-center gap-2">
              <>
                <Text variant="bodySm">Published by:</Text>
                <img
                  src={publisherLogo}
                  alt="Publisher Logo"
                  className="h-9 w-9 rounded-6 border-1 border-solid border-baseGraySlateSolid8 p-2"
                />
              </>
            </div>
          )}
        </div>
        {variation === 'Expanded' && (
          <div className={` flex flex-wrap  items-center`}>
            {tag && tag.length > 0 && (
              <div className="mb-2 flex basis-1/2 items-center gap-2">
                <Text variant="bodySm">Tags:</Text>
                {tag.map((item) => (
                  <Tag
                    variation="outlined"
                    textColor="#0066CC"
                    borderColor="#FF6B00"
                  >
                    {item}
                  </Tag>
                ))}
              </div>
            )}
            {formats && formats.length > 0 && (
              <div className="mb-2 flex basis-1/2 items-center gap-2">
                <Text variant="bodySm">Formats:</Text>
                {formats.map((item) => (
                  <Format fileType={item} width={32} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

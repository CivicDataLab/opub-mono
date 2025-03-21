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
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import { Text } from '../Text';

export interface CardProps {
  imageUrl?: string;
  tag?: string[];
  title: string;
  description?: string;
  date?: string;
  views?: string;
  geography?: string;
  sectorLogo?: string;
  publisherLogo?: string;
  variation: 'Collapsed' | 'Expanded';
  iconColor: Color;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  tag,
  title,
  description,
  date,
  views,
  geography,
  sectorLogo,
  publisherLogo,
  variation,
  iconColor,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-white border border-gray-200 shadow-md 5 flex max-w-sm flex-col gap-4 rounded-4 p-5 shadow-basicLg">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Card banner"
          className="h-40 w-full rounded-2"
        />
      )}
      <div className=" flex flex-col gap-4">
        <div>
          {tag && (
            <div className="mb-2 flex gap-2">
              {tag.map((item) => (
                <Tag>{item}</Tag>
              ))}
            </div>
          )}
          <Text color="highlight" variant="headingMd">
            {title}
          </Text>
        </div>
        {description && (
          <Text variant="bodySm">
            {description.length > 100
              ? isExpanded
                ? description
                : `${description.slice(0, 100)}...`
              : description}
            {description.length > 100 && (
              <Button
                kind="tertiary"
                size="slim"
                onClick={toggleDescription}
                className="text-blue-600 "
              >
                {isExpanded ? 'See Less' : 'See More'}
              </Button>
            )}
          </Text>
        )}
        <div className="flex items-center gap-4">
          {date && (
            <span className="flex items-center gap-1">
              <Icon source={IconCalendarEvent} color={iconColor} size={24} />
              <Text variant="bodySm">{date}</Text>
            </span>
          )}
          {views && (
            <span className="flex items-center gap-1">
              <Icon source={IconDownload} color={iconColor} size={24} />
              <Text variant="bodySm">{views} Views</Text>
            </span>
          )}
          {geography && (
            <span className="flex items-center gap-1">
              <Icon source={IconWorld} color={iconColor} size={24} />
              <Text variant="bodySm">{geography}</Text>
            </span>
          )}
        </div>
      </div>
      {(sectorLogo || publisherLogo) && <Divider />}
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-1 ">
          {sectorLogo && (
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
          )}
        </div>
        {publisherLogo && (
          <div className="flex items-center gap-1">
            <Text variant="bodySm">Published by:</Text>
            <img
              src={publisherLogo}
              alt="Publisher Logo"
              className="h-9 w-9 rounded-6 border-1 border-solid border-baseGraySlateSolid8 p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

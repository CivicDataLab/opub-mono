import React, { useState } from 'react';
import {
  IconCalendar,
  IconCalendarEvent,
  IconDownload,
  IconWorld,
  TablerIconsProps,
} from '@tabler/icons-react';

import { Color } from '../../types/icon';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Format } from '../Format/Format';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import { Text } from '../Text';

interface MetadataContent {
  icon: React.ComponentType<TablerIconsProps>; // This allows any Tabler icon component
  label: string;
  value: string;
}
interface FooterInfo {
  icon: string;
  label: string;
}
export interface CardProps {
  imageUrl?: string;
  tag?: string[];
  title: string;
  description?: string;
  variation: 'collapsed' | 'expanded';
  iconColor: Color;
  formats?: string[];
  metadataContent?: MetadataContent[];
  footerContent?: FooterInfo[];
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  tag,
  title,
  description,
  variation,
  iconColor,
  formats,
  metadataContent,
  footerContent,
}) => {
  const [isexpanded, setIsexpanded] = useState(false);
  const toggleDescription = () => setIsexpanded(!isexpanded);

  return (
    <div
      className={`bg-white border border-gray-200 shadow-md flex flex-col  rounded-4 p-5 shadow-basicLg ${
        variation === 'collapsed' ? 'max-w-sm gap-4' : 'w-full gap-6'
      }`}
    >
      {imageUrl && variation === 'collapsed' && (
        <img
          src={imageUrl}
          alt="Card banner"
          className="h-40 w-full rounded-2"
        />
      )}
      <div className=" flex flex-col gap-4">
        <div>
          {tag && variation === 'collapsed' && (
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
              className={variation !== 'collapsed' ? 'line-clamp-2 inline' : ''}
            >
              {variation === 'collapsed'
                ? description.length > 100
                  ? isexpanded
                    ? description
                    : `${description.slice(0, 100)}...`
                  : description
                : description.length > 300
                  ? isexpanded
                    ? description
                    : `${description.slice(0, 300)}...`
                  : description}
              {description.length > (variation === 'collapsed' ? 100 : 300) && (
                <Button
                  kind="tertiary"
                  size="slim"
                  onClick={toggleDescription}
                  className="text-blue-600 w-fit"
                >
                  {isexpanded ? 'See Less' : 'See More'}
                </Button>
              )}
            </Text>
          </>
        )}

        <div className="flex flex-wrap items-center gap-4">
          {metadataContent &&
            metadataContent.map((item, index) => (
              <span className="flex items-center gap-1" key={index}>
                <Icon source={item.icon} color={iconColor} size={24} />
                {variation !== 'collapsed' && (
                  <Text variant="bodySm" className=" pr-1">
                    {item.label}:
                  </Text>
                )}
                <Text variant="bodySm">{item.value}</Text>
              </span>
            ))}
        </div>
      </div>
      {footerContent && variation === 'collapsed' && <Divider />}
      <div className=" flex flex-col  gap-3">
        <div
          className={` flex flex-wrap  items-center  ${variation === 'collapsed' ? 'justify-between' : ' justify-normal'}`}
        >
          {footerContent &&
            footerContent.map((item, index) => (
              <div
                className={`flex ${variation !== 'collapsed' && 'basis-1/2'}  items-center  gap-2`}
                key={index}
              >
                <>
                  {variation !== 'collapsed' && (
                    <Text variant="bodySm">{item.label}:</Text>
                  )}
                  <img
                    src={item.icon}
                    alt="Publisher Logo"
                    className="h-9 w-9 rounded-6 border-1 border-solid border-baseGraySlateSolid8 p-2"
                  />
                </>
              </div>
            ))}
        </div>
        {variation === 'expanded' && (
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

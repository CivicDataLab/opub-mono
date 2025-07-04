import React, { HTMLAttributeAnchorTarget } from 'react';
import { TablerIconsProps } from '@tabler/icons-react';

import { Color } from '../../types/icon';
import { Divider } from '../Divider';
import { Format } from '../Format';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

interface MetadataContent {
  icon: React.ComponentType<TablerIconsProps>; // This allows any Tabler icon component
  label: string;
  value: string;
  tooltip?: string;
}
interface FooterInfo {
  icon: string;
  label: string;
  tooltip?: string;
}

interface typeInfo {
  label: string;
  fillColor: string;
  borderColor: string;
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
  type?: typeInfo[];
  href?: string;
  target?: HTMLAttributeAnchorTarget;
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
  type,
  href,
  target = '_self',
}) => {
  return (
    <a
      className={` border border-gray-200 flex flex-col justify-between rounded-4 bg-basePureWhite  p-5 shadow-card ${
        variation === 'collapsed' ? 'gap-4' : 'w-full gap-6'
      }`}
      href={href}
      target={target}
    >
      {imageUrl && variation === 'collapsed' && (
        <img
          src={imageUrl}
          alt="Card banner"
          className=" h-40 w-full rounded-2 object-cover"
        />
      )}
      <div className=" flex flex-col gap-4">
        <div>
          {type && variation === 'collapsed' && (
            <div className="mb-2 flex gap-2">
              {type.map((item) => (
                <Tag
                  variation="filled"
                  fillColor={item.fillColor}
                  borderColor={item.borderColor}
                >
                  {item.label}
                </Tag>
              ))}
            </div>
          )}

          {variation === 'collapsed' && title.length > 55 ? (
            <Tooltip content={title} align="end" width="wide">
              <Text color="highlight" variant="headingMd">
                {title.slice(0, 55)}...
              </Text>
            </Tooltip>
          ) : (
            <Text color="highlight" variant="headingMd">
              {title}
            </Text>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {metadataContent &&
            metadataContent.map((item, index) => (
              <span
                className="flex items-center gap-1"
                key={index}
                title={item.tooltip}
              >
                <Icon source={item.icon} color={iconColor} size={24} />
                {variation !== 'collapsed' && item.label.length > 0 && (
                  <Text variant="bodySm" className=" pr-1">
                    {item.label}:
                  </Text>
                )}
                <Text variant="bodySm">{item.value}</Text>
              </span>
            ))}
        </div>
        {(footerContent || description) && variation === 'collapsed' && (
          <Divider />
        )}
        {description && (
          <>
            {variation === 'collapsed' && description.length > 180 ? (
              <Tooltip content={description} align="end" width="wide">
                <Text variant="bodyMd" as="p" color="default">
                  {description.slice(0, 180)}...
                </Text>
              </Tooltip>
            ) : variation === 'expanded' && description.length > 320 ? (
              <Tooltip content={description} align="end" width="wide">
                <Text variant="bodyMd" as="p" color="default">
                  {description.slice(0, 320)}...
                </Text>
              </Tooltip>
            ) : (
              <Text variant="bodyMd" as="p" color="default">
                {description}
              </Text>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div
          className={` flex flex-wrap  items-center  ${variation === 'collapsed' ? 'justify-between' : ' justify-normal'}`}
        >
          {footerContent &&
          variation === 'collapsed' &&
          footerContent.length > 2 ? (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                {footerContent.slice(0, 2).map((item, index) => (
                  <img
                    key={index}
                    title={item.tooltip}
                    src={item.icon}
                    alt="Logo"
                    className="h-9 w-9 rounded-6 border-1 border-solid border-baseGraySlateSolid8 p-2"
                  />
                ))}
              </div>
              <div>
                <img
                  title={footerContent[2]?.tooltip}
                  src={footerContent[2]?.icon}
                  alt="Logo"
                  className="h-9 w-9 rounded-6 border-1 border-solid border-baseGraySlateSolid8 object-contain p-[2px]"
                />
              </div>
            </div>
          ) : (
            footerContent?.map((item, index) => {
              const isLastItem = index === footerContent.length - 1;
              return (
                <div
                  className={`flex ${variation !== 'collapsed' && 'basis-1/2'} items-center gap-2`}
                  key={index}
                >
                  {variation !== 'collapsed' && (
                    <Text variant="bodySm">{item.label}:</Text>
                  )}
                  <img
                    title={item.tooltip}
                    src={item.icon}
                    alt="Logo"
                    className={`h-9 w-9 rounded-6 border-1 border-solid border-baseGraySlateSolid8 ${
                      isLastItem ? 'object-contain p-[2px]' : 'p-2'
                    }`}
                  />
                </div>
              );
            })
          )}
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
    </a>
  );
};

export default Card;

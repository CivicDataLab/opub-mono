/**
 * ==============================
 * ✅ Card.tsx – UI Component
 * ==============================
 *
 * A reusable Card component that supports two layout variations:
 * - 'collapsed' – Compact preview card with image, title, and limited details.
 * - 'expanded' – Full-width view with additional metadata, tags, and formats.
 *
 */

import React, { HTMLAttributeAnchorTarget } from 'react';
import { TablerIconsProps } from '@tabler/icons-react';

import { Color } from '../../types/icon';
import { Divider } from '../Divider';
import { Format } from '../Format';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

/** Metadata displayed in the card with an icon and value. */
interface MetadataContent {
  icon: React.ComponentType<TablerIconsProps>; // Tabler icon component
  label: string;
  value: string;
  tooltip?: string;
}

/** Footer logos with optional tooltip text. */
interface FooterInfo {
  icon: string;
  label: string;
  tooltip?: string;
}

/**
 * Label badge with color customization.
 */
interface typeInfo {
  label: string;
  fillColor: string;
  borderColor: string;
}

/**
 * Main props for the Card component.
 */
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

/**
 * Card component – displays dataset or content previews with multiple customization options.
 */
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
      className={`border border-gray-200 flex flex-col rounded-4 bg-basePureWhite p-5 shadow-card ${
        variation === 'collapsed' ? 'h-full gap-4' : 'w-full gap-6'
      } hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105`}
      href={href}
      target={target}
    >
      {/* Display image only in collapsed mode */}
      {imageUrl && variation === 'collapsed' && (
        <img
          src={imageUrl}
          alt="Card banner"
          className="h-40 w-full rounded-2 object-cover"
        />
      )}

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4">
        <div>
          {/* Display type badges only in collapsed view */}
          {type && variation === 'collapsed' && (
            <div className="mb-2 flex gap-2">
              {type.map((item, index) => (
                <Tag
                  key={index}
                  variation="filled"
                  fillColor={item.fillColor}
                  borderColor={item.borderColor}
                >
                  {item.label}
                </Tag>
              ))}
            </div>
          )}

          {/* Truncate long titles in collapsed view */}
          {variation === 'collapsed' ? (
            <Tooltip content={title} align="end" width="wide">
              <Text
                color="highlight"
                variant="headingMd"
                className="line-clamp-1 overflow-hidden"
              >
                {title}
              </Text>
            </Tooltip>
          ) : (
            <Text color="highlight" variant="headingMd">
              {title}
            </Text>
          )}
        </div>

        {/* Metadata section */}
        <div className="flex flex-wrap items-center gap-4 overflow-hidden">
          {metadataContent?.map((item, index) => (
            <span
              className="flex min-w-0 flex-shrink-0 items-center gap-2"
              key={index}
              title={item.tooltip}
            >
              <Icon source={item.icon} color={iconColor} size={24} />
              {variation !== 'collapsed' && item.label && (
                <Text variant="bodySm" className="flex-shrink-0 pr-1">
                  {item.label}:
                </Text>
              )}
              {variation === 'collapsed' ? (
                <Tooltip content={item.value} align="end" width="wide">
                  <Text
                    variant="bodySm"
                    truncate
                    className="min-w-0 max-w-[120px] truncate"
                  >
                    {item.value}
                  </Text>
                </Tooltip>
              ) : (
                <Text variant="bodySm">{item.value}</Text>
              )}
            </span>
          ))}
        </div>

        {/* Divider between metadata and footer */}
        {(footerContent || description) && variation === 'collapsed' && (
          <Divider />
        )}

        {/* Description truncation based on variation */}
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

      {/* Footer section – logos or icon badges */}
      <div className="mt-auto flex flex-col gap-4">
        <div
          className={`flex flex-wrap items-center ${
            variation === 'collapsed' ? 'justify-between' : 'justify-normal'
          }`}
        >
          {/* Render first 3 logos with special layout */}
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
              <img
                title={footerContent[2]?.tooltip}
                src={footerContent[2]?.icon}
                alt="Logo"
                className="h-9 w-9 rounded-6 border-1 border-solid border-baseGraySlateSolid8 object-contain p-[2px]"
              />
            </div>
          ) : (
            footerContent?.map((item, index) => {
              const isLastItem = index === footerContent.length - 1;
              return (
                <div
                  className={`flex ${
                    variation !== 'collapsed' && 'basis-1/2'
                  } items-center gap-2`}
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

        {/* Tags and formats only shown in expanded view */}
        {variation === 'expanded' && (
          <div className="flex flex-wrap items-center">
            {tag && tag.length > 0 && (
              <div className="mb-2 flex basis-1/2 items-center gap-2">
                <Text variant="bodySm">Tags:</Text>
                {tag.map((item, index) => (
                  <Tag
                    key={index}
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
                {formats.map((item, index) => (
                  <Format key={index} fileType={item} width={32} />
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

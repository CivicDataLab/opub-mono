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
import {
  IconDatabase,
  IconExternalLink,
  IconReport,
  TablerIconsProps,
} from '@tabler/icons-react';

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
  iconType?: 'dataset' | 'useCase';
  label: string;
  fillColor?: string;
  borderColor?: string;
}

// Small icons used inside the type Tag, based on Tabler icons.
const TagIconMap: Record<
  'dataset' | 'useCase',
  React.ComponentType<TablerIconsProps>
> = {
  dataset: IconDatabase,
  useCase: IconReport,
};

export type Shadow = 'light' | 'dark';
export type Hover = 'scale' | 'shadowHighlight';

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
  /** Hover style: "scale" (default) scales and adds shadow, "borderHighlight" highlights the border. */
  hover?: Hover;
  /** Shadow intensity: "light" (default) or "dark". */
  shadow?: Shadow;
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
  hover = 'shadowHighlight',
  shadow = 'light',
}) => {
  const hoverClasses =
    hover === 'shadowHighlight'
      ? shadow === 'dark'
        ? 'transition-all duration-300 ease-in-out hover:shadow-basicXl'
        : 'transition-all duration-300 ease-in-out hover:shadow-basicLg'
      : 'transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg';

  const shadowClass = shadow === 'dark' ? 'shadow-card' : 'shadow-basicMd';

  console.log('metadataContent', metadataContent);

  return (
    <div
      className={`border flex flex-col overflow-hidden rounded-4 border-solid border-borderDefault bg-basePureWhite p-0 ${shadowClass} ${
        variation === 'collapsed' ? 'h-full' : 'w-full gap-6'
      } ${hoverClasses}`}
    >
      {/* Image + overlaid type badges in collapsed mode */}
      {variation === 'collapsed' && imageUrl && (
        <div className="relative w-full">
          <img
            // src={imageUrl}
            src="https://plus.unsplash.com/premium_photo-1664272436483-51e3b64e85ab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Card banner"
            className="h-40 w-full rounded-t-4 object-cover"
          />
          {type && type.length > 0 && (
            <div className="absolute left-4 top-4 flex gap-2">
              {type.map((item, index) => (
                <Tag
                  key={index}
                  variation="filled"
                  fillColor={item.fillColor || '#fff'}
                  borderColor={item.borderColor || '#000'}
                  borderRadius="8px"
                >
                  <div className="flex items-center gap-2">
                    {item.iconType && (
                      <Icon
                        source={TagIconMap[item.iconType]}
                        color={iconColor}
                        size={16}
                        className="mr-1"
                      />
                    )}
                    <span className="text-bodySm">{item.label}</span>
                  </div>
                </Tag>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          {/* Display type badges only in collapsed view (when there is no image) */}
          {(!imageUrl || variation !== 'collapsed') && type && (
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
                color="default"
                variant="headingMd"
                className=" line-clamp-1 overflow-hidden"
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

        {/* Description truncation based on variation */}
        {description && (
          <>
            {variation === 'collapsed' && description.length > 180 ? (
              <Tooltip content={description} align="end" width="wide">
                <Text
                  variant="bodyMd"
                  as="p"
                  color="default"
                  // className="text-textMedium"
                >
                  <span className="text-textMedium">
                    {description.slice(0, 180)}...
                  </span>
                </Text>
              </Tooltip>
            ) : variation === 'expanded' && description.length > 320 ? (
              <Tooltip content={description} align="end" width="wide">
                <Text variant="bodyMd" as="p" color="disabled">
                  <span className="text-textMedium">
                    {description.slice(0, 320)}...
                  </span>
                </Text>
              </Tooltip>
            ) : (
              <Text variant="bodyMd" as="p" color="default">
                {description}
              </Text>
            )}
          </>
        )}
        {/* Metadata section - pinned near footer in collapsed cards */}
        <div
          className={`flex flex-wrap items-center gap-4 overflow-hidden ${
            variation === 'collapsed' ? 'mt-auto' : ''
          }`}
        >
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
                    color="metadata"
                    truncate
                    className="min-w-0 max-w-[120px] truncate"
                  >
                    {item.value}
                  </Text>
                </Tooltip>
              ) : (
                <Text variant="bodySm" color="metadata">
                  {item.value}
                </Text>
              )}
            </span>
          ))}
        </div>

        {/* Divider between metadata and footer in collapsed cards */}
        {/* {variation === 'collapsed' &&
          (footerContent || description || metadataContent?.length) && <Divider />} */}
      </div>
      {/* Footer section – logos or icon badges */}
      <div className="mt-auto flex flex-col gap-4">
        <div
          className={`flex flex-wrap items-center ${
            variation === 'collapsed' ? 'justify-between' : 'justify-normal'
          }`}
        >
          {/* Render compact footer chips in collapsed layout */}
          {footerContent && variation === 'collapsed' ? (
            <div className="flex items-center pl-3">
              {footerContent.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className={`flex h-9 w-9 items-center justify-center rounded-6 border-1 border-solid border-baseGraySlateSolid8 bg-basePureWhite ${
                    index > 0 ? '-ml-1' : ''
                  }`}
                  title={item.tooltip}
                >
                  <img
                    src={item.icon}
                    alt="Logo"
                    className="h-7 w-7 object-contain p-[2px]"
                  />
                </div>
              ))}
              {footerContent.length > 3 && (
                <Tooltip
                  content={
                    <div className="flex min-w-[180px] flex-col gap-2">
                      {footerContent.slice(3).map((item, index) => (
                        <div className="flex items-center gap-2" key={index}>
                          <img
                            src={item.icon}
                            alt={item.label || 'Logo'}
                            className="h-5 w-5 rounded-6 border-1 border-solid border-baseGraySlateSolid8 object-contain p-[1px]"
                          />
                          <Text variant="bodySm">
                            {item.tooltip || item.label}
                          </Text>
                        </div>
                      ))}
                    </div>
                  }
                  align="start"
                  width="wide"
                >
                  <span className="text-bodySm text-medium -ml-1 flex h-9 w-9 items-center justify-center rounded-6 border-1 border-solid border-baseGraySlateSolid8 bg-baseGraySlateSolid2">
                    +{footerContent.length - 3}
                  </span>
                </Tooltip>
              )}
            </div>
          ) : (
            footerContent?.map((item, index) => {
              const isLastItem = index === footerContent.length - 1;
              return (
                <div
                  className={`flex ${
                    variation !== 'collapsed' && 'basis-1/2'
                  } items-center gap-2 px-6`}
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

        {/* View CTA shown in collapsed card footer */}
        {variation === 'collapsed' && (
          <div className="w-full p-4">
            {href ? (
              <a
                href={href}
                target={target}
                className="bg-actionPrimaryViewButtonDefault flex w-full items-center justify-center gap-2 rounded-2 px-4 py-3"
              >
                <Icon source={IconExternalLink} color="onBgDefault" size={24} />
                <Text variant="headingMd" color="onBgDefault">
                  View
                </Text>
              </a>
            ) : (
              <button
                type="button"
                className="bg-actionPrimaryViewButtonDefault flex w-full items-center justify-center gap-2 rounded-2 px-4 py-3"
                aria-disabled="true"
              >
                <Icon source={IconExternalLink} color="onBgDefault" size={24} />
                <Text variant="headingMd" color="onBgDefault">
                  View
                </Text>
              </button>
            )}
          </div>
        )}

        {/* Tags and formats only shown in expanded view */}
        {variation === 'expanded' && (
          <div className="flex flex-wrap items-center px-6 ">
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
    </div>
  );
};

export default Card;

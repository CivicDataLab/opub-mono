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
  stroke?: number;
  label: string;
  value: string | number;
  tooltip?: string;
}

/** Footer logos with optional tooltip text. */
interface FooterInfo {
  icon: string;
  label: string;
  tooltip?: string;
}

function formatCountCompactIndian(value: number): string {
  if (!Number.isFinite(value)) return String(value);

  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);

  if (abs < 1000) return `${sign}${abs}`;

  const formatUnit = (divisor: number, suffix: string) => {
    const floored = Math.floor(abs / divisor);
    const exact = abs % divisor === 0;
    return `${sign}${floored}${suffix}${exact ? '' : '+'}`;
  };

  if (abs >= 10000000) return formatUnit(10000000, 'Cr'); // Crore
  if (abs >= 100000) return formatUnit(100000, 'L'); // Lakh
  return formatUnit(1000, 'k');
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
  metadataContent?:
    | readonly []
    | readonly [MetadataContent]
    | readonly [MetadataContent, MetadataContent]
    | readonly [MetadataContent, MetadataContent, MetadataContent];
  footerContent?: FooterInfo[];
  type?: typeInfo[];
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  /** Hover style: "scale" (default) scales and adds shadow, "borderHighlight" highlights the border. */
  hover?: Hover;
  /** Shadow intensity: "light" (default) or "dark". */
  shadow?: Shadow;
  withViewButton?: boolean;
  leftFooterChips?: FooterInfo[];
  rightFooterChips?: FooterInfo[];
  withDivider?: boolean;
  /**
   * Reserve collapsed description space (2 body lines) even when description is missing.
   * Useful when mixing cards with and without descriptions in the same row.
   */
  reserveDescriptionSpace?: boolean;
}

/**
 * Card component – displays dataset or content previews with multiple customization options.
 */
const Card: React.FC<CardProps> = ({ withViewButton = true, ...props }) => {
  return withViewButton ? (
    <CardDesign {...props} withViewButton={withViewButton} />
  ) : (
    <>
      <a href={props.href} target={props.target}>
        <CardDesign {...props} withViewButton={withViewButton} />
      </a>
    </>
  );
};

const CardDesign: React.FC<CardProps> = ({
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
  withViewButton,
  leftFooterChips,
  rightFooterChips,
  withDivider = true,
  reserveDescriptionSpace = false,
}) => {
  const hoverClasses =
    hover === 'shadowHighlight'
      ? shadow === 'dark'
        ? 'transition-all duration-300 ease-in-out hover:shadow-basicXl'
        : 'transition-all duration-300 ease-in-out hover:shadow-basicLg'
      : 'transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg';

  const shadowClass = shadow === 'dark' ? 'shadow-card' : 'shadow-basicMd';

  return (
    <div
      className={`border flex flex-col overflow-hidden rounded-4 border-solid border-borderDefault bg-basePureWhite p-0 ${shadowClass} ${
        variation === 'collapsed' ? 'h-full' : 'w-full gap-6'
      } ${hoverClasses}`}
    >
      {/* Image + overlaid type badges in collapsed mode */}
      {variation === 'collapsed' && imageUrl && (
        <div className="relative w-full">
          <div className="h-40 w-full overflow-hidden rounded-t-4 bg-baseGraySlateSolid3">
            <img
              src={imageUrl}
              alt="Card banner"
              className="h-full w-full object-cover"
              onError={(e) => {
                // Hide broken image, show the div fallback behind it.
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

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
      <div className="p-1">
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

            {/* Collapse unused description space when description is missing. */}
            <div
              className={
                variation === 'collapsed'
                  ? description || reserveDescriptionSpace
                    ? 'min-h-[calc(2*var(--font-line-height-3)+2*var(--font-line-height-2))]'
                    : 'min-h-[calc(2*var(--font-line-height-3))]'
                  : undefined
              }
            >
              {/* Truncate long titles in collapsed view */}
              {variation === 'collapsed' ? (
                <Tooltip content={title} align="end" width="wide">
                  <Text
                    color="default"
                    variant="headingMd"
                    className="line-clamp-2 overflow-hidden"
                  >
                    {title}
                  </Text>
                </Tooltip>
              ) : (
                <Text color="highlight" variant="headingMd">
                  {title}
                </Text>
              )}

              {/* Description is always clamped to exactly 2 lines */}
              {description && (
                <Tooltip content={description} align="end" width="wide">
                  <Text
                    variant="bodyMd"
                    as="p"
                    color="subdued"
                    className="line-clamp-2 overflow-hidden text-textMedium"
                  >
                    {description}
                  </Text>
                </Tooltip>
              )}
            </div>
          </div>
          {/* Metadata section - pinned near footer in collapsed cards */}
          <div
            className={`flex items-center gap-4 overflow-hidden ${
              variation === 'collapsed' ? 'mt-auto flex-nowrap' : 'flex-wrap'
            }`}
          >
            {metadataContent?.map(
              (item, index) =>
                ((typeof item.value === 'string' &&
                  item.value &&
                  item.value !== '') ||
                  typeof item.value === 'number') && (
                  <span
                    className={`flex items-center gap-2 ${
                      variation === 'collapsed'
                        ? index === 2
                          ? 'min-w-[6ch] flex-[1_1_0] overflow-hidden'
                          : 'min-w-0 flex-[0_1_auto] overflow-hidden'
                        : 'min-w-0 flex-shrink-0'
                    }`}
                    key={index}
                    title={item.tooltip}
                  >
                    <Icon
                      source={item.icon}
                      color={iconColor}
                      size={24}
                      stroke={item?.stroke || 2}
                    />
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
                          className="min-w-0 flex-1 truncate"
                        >
                          {typeof item.value === 'number'
                            ? formatCountCompactIndian(item.value)
                            : item.value}
                        </Text>
                      </Tooltip>
                    ) : (
                      <Text variant="bodySm" color="metadata">
                        {typeof item.value === 'number'
                          ? formatCountCompactIndian(item.value)
                          : item.value}
                      </Text>
                    )}
                  </span>
                )
            )}
          </div>

          {/* Divider between metadata and footer in collapsed cards */}
          {withDivider && <Divider />}
        </div>
        {/* Footer section – logos or icon badges */}
        <div className="mt-auto flex flex-col gap-3">
          {footerContent && (
            <div
              className={`flex flex-wrap items-center ${
                variation === 'collapsed' ? 'justify-between' : 'justify-normal'
              } ${withViewButton ? '' : 'pb-4'}`}
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
                            <div
                              className="flex items-center gap-2"
                              key={index}
                            >
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
          )}
          {/* Render compact footer chips in collapsed layout */}
          {!footerContent && (
            <div
              className={`flex items-center justify-between gap-2 pr-2 ${withViewButton ? '' : 'pb-4'}`}
            >
              {leftFooterChips && (
                <div className="flex items-center pl-3">
                  {leftFooterChips.slice(0, 3).map((item, index) => (
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
                  {leftFooterChips.length > 3 && (
                    <Tooltip
                      content={
                        <div className="flex min-w-[180px] flex-col gap-2">
                          {leftFooterChips.slice(3).map((item, index) => (
                            <div
                              className="flex items-center gap-2"
                              key={index}
                            >
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
                        +{leftFooterChips.length - 3}
                      </span>
                    </Tooltip>
                  )}
                </div>
              )}
              {rightFooterChips && (
                <div className="flex items-center pl-3">
                  {rightFooterChips.slice(0, 3).map((item, index) => (
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
                  {rightFooterChips.length > 3 && (
                    <Tooltip
                      content={
                        <div className="flex min-w-[180px] flex-col gap-2">
                          {rightFooterChips.slice(3).map((item, index) => (
                            <div
                              className="flex items-center gap-2"
                              key={index}
                            >
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
                        +{rightFooterChips.length - 3}
                      </span>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
          )}
          {/* View CTA shown in collapsed card footer */}
          {variation === 'collapsed' && withViewButton && (
            <div className="w-full px-3 py-2">
              {href ? (
                <a
                  href={href}
                  target={target}
                  className="flex w-full items-center justify-center gap-2 rounded-2 bg-actionPrimaryViewButtonDefault px-4 py-3"
                >
                  <Icon
                    source={IconExternalLink}
                    color="onBgDefault"
                    size={24}
                  />
                  <Text variant="headingMd" color="onBgDefault">
                    View
                  </Text>
                </a>
              ) : (
                withViewButton && (
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-2 bg-actionPrimaryViewButtonDefault px-4 py-3"
                    aria-disabled="true"
                  >
                    <Icon
                      source={IconExternalLink}
                      color="onBgDefault"
                      size={24}
                    />
                    <Text variant="headingMd" color="onBgDefault">
                      View
                    </Text>
                  </button>
                )
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
    </div>
  );
};

export default Card;

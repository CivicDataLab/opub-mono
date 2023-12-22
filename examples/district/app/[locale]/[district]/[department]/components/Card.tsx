import { schemes } from '../[scheme]/scheme.config';
import { InfoButton } from '@/components/InfoButton';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Icon, ProgressBar, Divider, Text } from 'opub-ui';
import React from 'react';

export const SchemeCard = ({
  data,
}: {
  data: {
    label: string;
    href: string;
    image: string;
    lastUpdated: string;
    departmentHref: string;
    cards: {
      value: string | number;
      label: string;
      type?: string;
    }[];
  };
}) => {
  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 justify-between p-4 bg-surfaceDefault rounded-05 shadow-elementCard">
      <div className="flex flex-col gap-3">
        <Link
          href={`${data.departmentHref}/${data.href}`}
          className="block hover:underline"
        >
          <span className="flex gap-4 items-center">
            <Image
              src={schemes[data.href].logo}
              alt=""
              width={100}
              height={100}
              className="flex-shrink-0"
            />
            <Text variant="headingLg" as="h3">
              {data.label}
            </Text>
          </span>
        </Link>

        <Divider />

        <Text variant="bodyMd" color="subdued">
          Last Updated: {data.lastUpdated || 'N/A'}
        </Text>

        <div className="flex flex-wrap gap-4 sm:grid-cols-2">
          {data.cards.map((card, index) => {
            if (card.type === 'progress')
              return (
                <ProgressCard
                  value={card.value}
                  label={card.label}
                  key={card.label + index}
                />
              );

            return (
              <ContentCard
                value={card.value}
                label={card.label}
                key={card.label + index}
              />
            );
          })}
        </div>
      </div>
      <Link
        href={`${data.departmentHref}/${data.href}`}
        className="rounded-1 flex items-center justify-between text-textInteractive hover:underline"
      >
        <Text variant="bodyMd" fontWeight="medium" color="inherit">
          Explore More <Text visuallyHidden>about {data.label}</Text>
        </Text>
        <Icon source={Icons.right} color="interactive" />
      </Link>
    </div>
  );
};

export const ContentCard = ({
  value,
  label,
  description,
  color,
  info,
  className,
  link,
}: {
  value: string | number;
  label: string;
  description?: string;
  color?: string;
  info?: string;
  className?: string;
  link?: string;
}) => {
  return (
    <CardLayout className={className + ' gap-4'} color={color}>
      <div className="flex items-center gap-2 justify-between">
        <Text variant="headingXl">{value}</Text>
        {link && (
          <Link
            href={`?tab=explorer`}
            className="rounded-1 flex items-center justify-between text-textInteractive hover:underline"
          >
            <Text variant="bodyMd" fontWeight="medium" color="inherit">
              View on Explorer
            </Text>
            <Icon source={Icons.right} color="interactive" />
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2 justify-between">
        <Text variant="bodyLg">{label}</Text>

        {info && <InfoButton>{info}</InfoButton>}
      </div>
      {description && (
        <>
          <Divider className="my-4" />
          <Text variant="bodyMd">{description}</Text>
        </>
      )}
    </CardLayout>
  );
};

export const ProgressCard = ({
  value,
  label,
  description,
  color,
  min,
  max,
  className,
  link,
}: {
  value: string | number;
  label: string;
  description?: string;
  color?: string;
  min?: number;
  max?: number;
  className?: string;
  link?: string;
}) => {
  return (
    <CardLayout className={className} color={color}>
      <div className="flex items-center gap-2 justify-between">
        <Text variant="headingXl">{value}%</Text>
        {link && (
          <Link
            href={`?tab=explorer`}
            className="rounded-1 flex items-center justify-between text-textInteractive hover:underline"
          >
            <Text variant="bodyMd" fontWeight="medium" color="inherit">
              View on Explorer
            </Text>
            <Icon source={Icons.right} color="interactive" />
          </Link>
        )}
      </div>
      <Text variant="bodyLg" className="mb-4">
        {label}
      </Text>
      <div>
        <ProgressBar value={Number(value)} color="highlight" size="medium" />
        <div className="flex gap-3 items-center justify-between mt-2">
          <Text variant="headingLg" fontWeight="medium">
            {min || 0}
          </Text>
          <Text variant="headingLg" fontWeight="medium">
            {max || 100}
          </Text>
        </div>
      </div>
      {description && <Text variant="bodyMd">{description}</Text>}
    </CardLayout>
  );
};

const CardLayout = ({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex-grow md:w-[45%] ',
        'p-4 rounded-1 border-1 border-solid border-borderSubdued flex flex-col gap-3',
        color === 'highlight' &&
          'bg-surfaceHighlightSubdued w-auto border-borderHighlightSubdued',
        className
      )}
    >
      {children}
    </div>
  );
};

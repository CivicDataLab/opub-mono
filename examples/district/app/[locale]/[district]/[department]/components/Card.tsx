import { schemes } from '../[scheme]/scheme.config';
import { InfoButton } from '@/components/InfoButton';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Icon, ProgressBar, Separator, Text } from 'opub-ui';

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
    <div className="flex flex-col gap-2 justify-between p-4 pb-3 bg-surface rounded-05 shadow-card">
      <div className="flex flex-col gap-3">
        <Link
          href={`${data.departmentHref}/${data.href}`}
          className="block hover:underline"
        >
          <span className="flex gap-6 items-center">
            <Image
              src={schemes[data.href].logo}
              alt=""
              width={100}
              height={100}
              className="flex-shrink-0"
            />
            <Text variant="headingXl" as="h3">
              {data.label}
            </Text>
          </span>
        </Link>

        <Separator />

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
        className="py-2 pl-4 pr-1 bg-surface hover:bg-surfaceHovered rounded-1 flex justify-between text-interactive"
      >
        <Text variant="bodyMd" fontWeight="medium" color="inherit">
          Explore More <Text visuallyHidden>about {data.label}</Text>
        </Text>
        <Icon source={Icons.right} />
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
}: {
  value: string | number;
  label: string;
  description?: string;
  color?: string;
  info?: string;
}) => {
  return (
    <div
      className={cn(
        'flex-grow md:w-[45%]',
        'p-4 rounded-1 border-[1px] border-solid border-borderSubdued flex flex-col gap-3',
        color === 'highlight' &&
          'bg-surfaceHighlightSubdued w-auto border-borderHighlightSubdued'
      )}
    >
      <Text variant="headingXl">{value}</Text>
      <div className="flex items-center gap-2 justify-between">
        <Text variant="bodyLg">{label}</Text>

        {info && <InfoButton>{info}</InfoButton>}
      </div>
      {description && (
        <>
          <Separator />
          <Text variant="bodyMd">{description}</Text>
        </>
      )}
    </div>
  );
};

export const ProgressCard = ({
  value,
  label,
  description,
  color,
  min,
  max,
}: {
  value: string | number;
  label: string;
  description?: string;
  color?: string;
  min?: number;
  max?: number;
}) => {
  return (
    <div
      className={cn(
        'flex-grow md:w-[45%] ',
        'p-4 rounded-1 border-[1px] border-solid border-borderSubdued flex flex-col gap-3',
        color === 'highlight' &&
          'bg-surfaceHighlightSubdued w-auto border-borderHighlightSubdued'
      )}
    >
      <Text variant="headingXl">{value}%</Text>
      <Text variant="bodyLg">{label}</Text>
      <div>
        <ProgressBar value={Number(value)} />
        <div className="flex gap-3 items-center justify-between mt-2">
          <Text variant="bodyMd" fontWeight="medium">
            {min || 0}
          </Text>
          <Text variant="bodyMd" fontWeight="medium">
            {max || 100}
          </Text>
        </div>
      </div>
      {description && <Text variant="bodyMd">{description}</Text>}
    </div>
  );
};

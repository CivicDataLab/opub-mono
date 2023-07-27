import Image from 'next/image';
import Link from 'next/link';
import { Icon, ProgressBar, Separator, Text } from 'opub-ui';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export const SchemeCard = ({
  data,
}: {
  data: {
    label: string;
    href: string;
    image: string;
    lastUpdated: string;
    cards: {
      value: string | number;
      label: string;
      type?: string;
    }[];
  };
}) => {
  return (
    <div className="flex flex-col gap-1 justify-between py-4 px-3 bg-surface rounded-05 shadow-card">
      <div className="flex flex-col gap-3">
        <Link href={data.href} className="block hover:underline">
          <span className="flex gap-6 items-center">
            <Image
              src={data.image}
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
        href={data.href}
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
  color,
}: {
  value: string | number;
  label: string;
  color?: string;
}) => {
  return (
    <div
      className={cn(
        'flex-grow w-[45%]',
        'p-4 rounded-1 border-[1px] border-solid border-borderSubdued flex flex-col gap-3',
        color === 'highlight' &&
          'bg-surfaceHighlightSubdued w-auto border-borderHighlightSubdued'
      )}
    >
      <Text variant="headingXl">{value}</Text>
      <Text variant="bodyLg">{label}</Text>
    </div>
  );
};

export const ProgressCard = ({
  value,
  label,
  color,
}: {
  value: string | number;
  label: string;
  color?: string;
}) => {
  return (
    <div
      className={cn(
        'flex-grow w-[45%]',
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
            0
          </Text>
          <Text variant="bodyMd" fontWeight="medium">
            12.7 L
          </Text>
        </div>
      </div>
    </div>
  );
};

import Image from 'next/image';
import Link from 'next/link';
import { Icon, Separator, Text } from 'opub-ui/src';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export const SchemeCard = ({
  data,
}: {
  data: {
    label: string;
    href: string;
    image: string;
    cards: {
      value: string;
      label: string;
    }[];
  };
}) => {
  return (
    <div className="flex flex-col gap-2 justify-between py-4 px-3 bg-surface rounded-05 shadow-card">
      <div className="flex flex-col gap-4">
        <div>
          <Link href={data.href} className="block hover:underline">
            <span className="flex gap-6 items-center mb-3">
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
        </div>
        <div className="flex flex-wrap gap-4 sm:grid-cols-2">
          {data.cards.map((card, index) => (
            <ContentCard
              value={card.value}
              label={card.label}
              key={card.label + index}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <Link
          href="#"
          className="py-2 px-4 bg-surface hover:bg-surfaceHovered rounded-1"
        >
          <Text variant="bodyMd" fontWeight="medium">
            Explore More <Text visuallyHidden>about {data.label}</Text>
          </Text>
        </Link>
      </div>
    </div>
  );
};

export const ContentCard = ({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color?: string;
}) => {
  return (
    <div
      className={cn(
        'flex-grow w-[45%]',
        'p-4 rounded-05 border-[1px] border-solid border-borderSubdued flex flex-col gap-3',
        color === 'highlight' &&
          'bg-surfaceHighlightSubdued border-none w-auto shadow-card'
      )}
    >
      <Text variant="headingXl">{value}</Text>
      <Text variant="bodyLg" color="subdued">
        {label}
      </Text>
    </div>
  );
};

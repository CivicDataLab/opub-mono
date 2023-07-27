import Link from 'next/link';
import { Icon, Separator, Text } from 'opub-ui';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export const DepartmentCard = ({
  data,
}: {
  data: {
    label: string;
    href: string;
    cards: {
      value: string;
      label: string;
    }[];
  };
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-surface rounded-05 shadow-card">
      <div>
        <Link href={data.href} className="block hover:underline mb-4">
          <Text variant="headingLg" as="h3">
            {data.label}
          </Text>
        </Link>
        <Separator />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.cards.map((card, index) => (
          <ContentCard
            value={card.value}
            label={card.label}
            key={card.label + index}
          />
        ))}
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
  value: string;
  label: string;
  color?: string;
}) => {
  return (
    <div
      className={cn(
        'p-4 rounded-1 border-[1px] border-solid border-borderSubdued flex flex-col gap-3',
        color === 'highlight' &&
          'bg-surfaceHighlightSubdued border-borderHighlightSubdued'
      )}
    >
      <Text variant="headingXl">{value}</Text>
      <Text variant="bodyLg" color="subdued">
        {label}
      </Text>
    </div>
  );
};

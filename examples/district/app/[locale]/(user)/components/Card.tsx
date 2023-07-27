import Link from 'next/link';
import { Icon, Separator, Text } from 'opub-ui/src';

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
    <div className="flex flex-col gap-4 py-4 px-3 bg-surface rounded-05 shadow-card">
      <div>
        <Link href={data.href} className="block hover:underline">
          <span className="flex gap-2 items-center justify-between mb-3">
            <Text variant="headingXl" as="h3">
              {data.label}
            </Text>
            <Icon source={Icons.cardLink} color="interactive" size={32} />
          </span>
        </Link>
        <Separator />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {data.cards.map((card, index) => (
          <ContentCard
            value={card.value}
            label={card.label}
            key={card.label + index}
          />
        ))}
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
        'p-4 rounded-05 border-[1px] border-solid border-borderSubdued flex flex-col gap-3',
        color === 'highlight' && 'bg-surfaceHighlightSubdued border-none'
      )}
    >
      <Text variant="headingXl">{value}</Text>
      <Text variant="bodyLg" color="subdued">
        {label}
      </Text>
    </div>
  );
};

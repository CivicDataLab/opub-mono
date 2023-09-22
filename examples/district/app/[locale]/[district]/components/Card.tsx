import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Icon, Separator, Text } from 'opub-ui';

export const DepartmentCard = ({
  data,
  district,
}: {
  data: {
    label: string;
    href: string;

    cards?: {
      value: string;
      label: string;
    }[];
  };
  district: string;
}) => {
  return (
    <Link href={`/${district}/${data.href}`}>
      <div className="p-4 pb-3 bg-surface rounded-05 shadow-card hover:shadow-deep">
        <Text variant="headingLg" as="h3">
          {data.label}
        </Text>

        <Separator className="my-4" />

        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          {data.cards &&
            data.cards.map((card, index) => (
              <ContentCard
                value={card.value}
                label={card.label}
                key={card.label + index}
              />
            ))}
        </div>

        <div className="py-2 pl-4 pr-1 bg-surface rounded-1 flex justify-between text-interactive hover:no-underline">
          <Text variant="bodyMd" fontWeight="medium" color="inherit">
            Explore More <Text visuallyHidden>about {data.label}</Text>
          </Text>
          <Icon source={Icons.right} />
        </div>
      </div>
    </Link>
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

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Icon, Divider, Text } from 'opub-ui';

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
      <div className="p-4 bg-surfaceDefault rounded-05 shadow-elementCard">
        <Text
          variant="headingLg"
          as="h3"
          className="min-h-[48px] flex items-center"
        >
          {data.label}
        </Text>

        <Divider className="my-4" />

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

        <div className="flex justify-between text-textInteractive hover:no-underline">
          <Text variant="bodyMd" fontWeight="medium" color="inherit">
            Explore More <Text visuallyHidden>about {data.label}</Text>
          </Text>
          <Icon source={Icons.right} color="interactive" />
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

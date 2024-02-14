import Link from 'next/link';
import { Icon, Text } from 'opub-ui';

import Icons from '@/components/icons';

const content = [
  {
    district: 'Analytics Dashboard',
    scheme: 'Explore data model insight for all districts and revenue circles',
    link: `/analytics/?indicator=risk-score&time-period=2023_08&boundary=district`,
  },
  {
    district: 'Dataset Explorer',
    scheme:
      'Explore datasets on meteorological and demographic factors, and DRR tenders',
    link: '/datasets',
  },
  {
    district: 'Tender Data Dashboard',
    scheme: 'Go to our dashboard for Assam DRR tenders data',
    link: '#',
  },
];

export const QuickLinks = () => {
  return (
    <section className="mt-6 p-4 items-start md:mt-10">
      <Text variant="headingLg" fontWeight="semibold" color="subdued">
        Quick Links
      </Text>

      <div className="w-340 mt-4 flex gap-4 md:gap-4">
        {content.map((item, index) => (
          <Link
            key={item.district + index}
            href={item.link}
            className="flex grow flex-row gap-4 rounded-05 bg-surfaceDefault p-4 shadow-elementCard md:basis-1/3 lg:basis-1/4"
          >
            <div className="flex flex-col items-start justify-between gap-4">
              <Text variant="headingLg" fontWeight="medium">
                {item.district}
              </Text>
              <Text variant="headingSm" color="subdued" fontWeight="regular">
                {item.scheme}
              </Text>
            </div>

            <div className="flex items-start justify-end gap-2">
              <Text color="interactive">Explore</Text>
              <Icon source={Icons.right} color="interactive" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

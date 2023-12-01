import Icons from '@/components/icons';
import Link from 'next/link';
import { Icon, Text } from 'opub-ui';

const content = [
  {
    district: 'Morigaon',
    scheme: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    link: '#',
  },
  {
    district: 'Morigaon',
    scheme: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    link: '#',
  },
  {
    district: 'Morigaon',
    scheme: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    link: '#',
  },
  {
    district: 'Morigaon',
    scheme: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    link: '#',
  },
  {
    district: 'Morigaon',
    scheme: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    link: '#',
  },
  {
    district: 'Morigaon',
    scheme: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    link: '#',
  },
];

export const QuickLinks = () => {
  return (
    <section className="mt-6 md:mt-10">
      <Text variant="headingLg" fontWeight="semibold" color="subdued">
        Quick Links
      </Text>

      <div className="flex gap-2 md:gap-4 flex-wrap mt-4">
        {content.map((item, index) => (
          <Link
            key={item.district + index}
            href={item.link}
            className="flex flex-col grow md:basis-1/3 lg:basis-1/4 gap-4 p-4 rounded-05 bg-surfaceDefault shadow-elementCard"
          >
            <div className="flex items-center justify-between gap-1">
              <Text
                variant="headingSm"
                color="subdued"
                fontWeight="medium"
                className="uppercase"
              >
                {item.district}
              </Text>
              <Icon source={Icons.right} color="interactive" />
            </div>
            <Text variant="headingLg" fontWeight="semibold">
              {item.scheme}
            </Text>
          </Link>
        ))}
      </div>
    </section>
  );
};

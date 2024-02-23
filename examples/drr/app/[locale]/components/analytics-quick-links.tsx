import Image from 'next/image';
import Link from 'next/link';
import { Button, Text } from 'opub-ui';

import { AnalyticsQuickLinksText, AnalyticsURL } from '@/config/consts';

export const QuickLinks = () => {
  return (
    <section className=" flex h-[383px] w-full flex-wrap items-center justify-center">
      <div className="px-30 flex w-[1400px] gap-3 py-12">
        <div className="flex flex-col  items-start justify-center gap-6 px-9 ">
          <Text variant="heading4xl" fontWeight="bold" color="default">
            Analytics Dashboard
          </Text>
          <Text variant="bodyLg" fontWeight="regular" color="default">
            {AnalyticsQuickLinksText}
          </Text>
          <Link href={AnalyticsURL}>
            <Button variant="success" kind="primary" size="large">
              <Text variant="bodyLg" fontWeight="bold" color="default">
                Explore More
              </Text>
            </Button>
          </Link>
        </div>
        <div className="relative mt-4 flex">
          <Image
            src="/logo/analyticsLinkPlaceholder2.png"
            height={252}
            width={364}
            alt="Assam DRR Dashboard"
          />
          <Image
            src="/logo/analyticsLinkPlaceholder.png"
            height={188}
            width={330}
            alt="Assam DRR Dashboard"
            style={{ marginLeft: '-190px' }}
          />

          <Image
            src="/logo/analyticsLinkPlaceholder3.png"
            height={82}
            width={364}
            alt="Assam DRR Dashboard"
            style={{
              marginLeft: '-65px',
              marginBottom: '2px',
              marginTop: '22px',
            }}
          />
        </div>
      </div>
    </section>
  );
};

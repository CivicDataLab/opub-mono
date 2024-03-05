import Image from 'next/image';
import Link from 'next/link';
import { Button, Text } from 'opub-ui';

import { AnalyticsQuickLinksText, AnalyticsURL } from '@/config/consts';

export const QuickLinks = () => {
  return (
    <section className="h-[389px] flex-wrap">
      <div className="flex h-full w-[1300px] items-center justify-center gap-3">
        <div className="flex flex-col justify-center gap-8 px-6 ">
          <Text variant="heading3xl" fontWeight="bold" color="default">
            Analytics Dashboard
          </Text>
          <Text variant="bodyLg" fontWeight="regular" color="default">
            {AnalyticsQuickLinksText}
          </Text>
          <Link href={AnalyticsURL}>
            <Button className=" bg-[#71E57D]" variant="success" size="large">
              <Text variant="bodyLg" fontWeight="bold" color="default">
                Explore More
              </Text>
            </Button>
          </Link>
        </div>
        <div className="relative flex items-center justify-center ">
          <Image
            className="object-contain"
            src="/logo/analyticLinkPlaceholder2.png"
            height={252}
            width={364}
            alt="Assam DRR Dashboard"
            style={{ marginTop: '-30px' }}
          />
          <Image
            src="/logo/analyticLinkPlaceholder.png"
            className="object-contain"
            height={214}
            width={330}
            alt="Assam DRR Dashboard"
            style={{ marginLeft: '-190px', marginTop: '40px' }}
          />

          <Image
            className="object-contain"
            src="/logo/analyticLinkPlaceholder3.png"
            height={152}
            width={360}
            alt="Assam DRR Dashboard"
            style={{
              marginLeft: '-105px',
              marginBottom: '2px',
              marginTop: '14px',
            }}
          />
        </div>
      </div>
    </section>
  );
};

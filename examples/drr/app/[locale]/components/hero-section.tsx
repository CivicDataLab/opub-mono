import Image from 'next/image';
import { Text } from 'opub-ui';

import { HeroSectionText } from '@/config/consts';
import { cn } from '@/lib/utils';
import styles from './styles.module.scss';

export const HeroSection = () => {
  return (
    <section className={cn(styles.HeroSection)}>
      <div className=" flex w-fit flex-wrap items-center justify-center gap-6 bg-baseGraySlateSolid12 bg-opacity-20 p-4">
        <Image
          src="/logo/assamDRRLogo.svg"
          width={400}
          height={104}
          alt="Assam DRR Dashboard"
        />

        <Text
          className="w-[692px] text-surfaceDefault"
          variant="headingXl"
          fontWeight="medium"
        >
          {HeroSectionText}
        </Text>
      </div>
    </section>
  );
};

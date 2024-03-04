import Image from 'next/image';
import Link from 'next/link';
import { Text } from 'opub-ui';

export const Footer = () => {
  return (
    <footer className="flex flex-col flex-wrap gap-4 bg-backgroundSolidDark px-5 py-4 md:flex-row md:justify-between md:px-10 md:py-8">
      <div className="flex flex-row items-center gap-3">
        <Image
          src="/logo/IDSLogo1.png"
          width={245}
          height={24}
          alt="Assam DRR Dashboard"
        />
        <Image
          src="/logo/Vector.svg"
          width={60}
          height={50}
          alt="Assam DRR Dashboard"
        />
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/logo/cdlofficiallogo.png"
            width={64}
            height={64}
            alt="Assam DRR Dashboard"
          />
          <Image
            src="/logo/RockefellerLogo.png"
            width={106}
            height={64}
            alt="Assam DRR Dashboard"
          />
          <Image
            src="/logo/ocp.png"
            width={91}
            height={40}
            alt="Assam DRR Dashboard"
          />
          <Image
            src="/logo/ASDMA2.png"
            width={59}
            height={54}
            alt="Assam DRR Dashboard"
          />
        </div>
      </div>
      <div className="text-center md:text-right">
        <Text variant="headingSmSpaced" color="onBgDefault">
          made with ❤ in india️
        </Text>
        <Text
          variant="bodySm"
          color="onBgDefault"
          className="mt-2 block md:mt-3"
        >
          a Data4Districts product by{' '}
          <Link
            className="underline"
            target="_blank"
            href="https://civicdatalab.in/"
          >
            CivicDataLab
          </Link>
        </Text>
      </div>
    </footer>
  );
};

import Link from 'next/link';
import { Text } from 'opub-ui';

export const Footer = () => {
  return (
    <footer className="py-4 md:py-8 px-5 md:px-10 bg-backgroundSolidDark flex flex-col md:flex-row gap-4 flex-wrap items-center justify-center md:justify-between">
      <div>
        <Text color="onBgDefault">Assam District Dashboard</Text>
      </div>
      <div className="text-center md:text-right">
        <Text variant="headingSmSpaced" color="onBgDefault">
          made with ❤ in india️
        </Text>
        <Text
          variant="bodySm"
          color="onBgDefault"
          className="mt-2 md:mt-3 block"
        >
          powered by D4D,{' '}
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

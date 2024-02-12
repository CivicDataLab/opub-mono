import Link from 'next/link';
import { Text } from 'opub-ui';

export const Footer = () => {
  return (
    <footer className="flex flex-col flex-wrap items-center justify-center gap-4 bg-backgroundSolidDark px-5 py-4 md:flex-row md:justify-between md:px-10 md:py-8">
      <div className="flex flex-col items-end">
        <Text color="onBgDefault">IDS Disaster Risk Reduction Dashboard</Text>
        <Text color="onBgDefault">- a Data4Districts product</Text>
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
          powered by{' '}
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

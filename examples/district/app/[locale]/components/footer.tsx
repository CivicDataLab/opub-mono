import Link from 'next/link';
import { Text } from 'opub-ui';

export const Footer = () => {
  return (
    <footer className="py-8 px-10 bg-backgroundSolidDark flex gap-2 items-center justify-between">
      <div>
        <Text color="onBgDefault">Assam District Dashboard</Text>
      </div>
      <div className="text-right">
        <Text variant="headingSmSpaced" color="onBgDefault">
          made with ❤ in india️
        </Text>
        <Text variant="bodySm" color="onBgDefault" className="mt-3 block">
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

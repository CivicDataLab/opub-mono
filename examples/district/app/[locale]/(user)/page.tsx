import Link from 'next/link';
import { IconBrandTabler, IconShare3 } from '@tabler/icons-react';
import { DateField, Text } from 'opub-ui';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className="flex flex-col gap-2 w-full h-full items-center justify-center">
      <IconBrandTabler size="80" color="var(--icon)" />
      <Text variant="heading4xl" as="h1" alignment="center">
        Welcome to Open Publishing
      </Text>
      <DateField name="a" />
      <Text color="subdued" variant="bodyLg" as="p" alignment="center">
        Open Publishing is a platform for publishing and sharing data and
        stories.
      </Text>
      <Link href="/dashboard/dataset" className={styles.card}>
        <h2>Go to Dashboard</h2>
        <IconShare3 />
      </Link>
    </main>
  );
}

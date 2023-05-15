'use client';

import Link from 'next/link';
import { Text } from '@opub-cdl/ui';
import { IconBrandTabler, IconShare3 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from '../page.module.scss';

export function Content() {
  const t = useTranslations('home');

  return (
    <>
      <IconBrandTabler size="80" color="var(--icon)" />
      <Text variant="heading4xl" as="h1" alignment="center">
        {t('title')}
      </Text>
      <Text color="subdued" variant="bodyLg" as="p" alignment="center">
        {t('subtitle')}
      </Text>
      <Link href="/dashboard/dataset" className={styles.card}>
        <Text variant="headingMd">{t('cta')}</Text>
        <IconShare3 />
      </Link>
    </>
  );
}

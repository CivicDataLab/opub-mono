'use client';

import { IconBrandTabler, IconShare3 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Button, ButtonGroup, Icon, Text } from 'opub-ui';

export function Content() {
  const t = useTranslations('home');

  return (
    <>
      <IconBrandTabler size={64} color="black" />
      <Text variant="heading4xl" as="h1" alignment="center">
        {t('title')}
      </Text>
      <Text
        color="subdued"
        variant="bodyLg"
        as="p"
        alignment="center"
        className="mb-4"
      >
        {t('subtitle')}
      </Text>
      <ButtonGroup>
        <Button variant="interactive" kind="secondary" url="/chart">
          <Text variant="headingMd">Go to Charts</Text>
        </Button>
        <Button
          variant="interactive"
          kind="primary"
          url="/dashboard/dataset"
          icon={<Icon source={IconShare3} color="onBgDefault" />}
        >
          <Text color="onBgDefault" variant="headingMd">
            {t('cta')}
          </Text>
        </Button>
      </ButtonGroup>
    </>
  );
}

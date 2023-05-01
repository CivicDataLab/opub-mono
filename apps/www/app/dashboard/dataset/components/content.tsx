'use client';

import { Box, Icon, Text } from '@opub-cdl/ui';

import { LinkButton } from '@/components/Link';
import { Icons } from '@/components/icons';
import styles from '../dataset.module.scss';

export function Content({ data }: { data?: any }) {
  return (
    <div className={styles.ContentWrapper}>
      <div className={styles.Content}>
        <Icon source={Icons.addDataset} color="base" />
        <Text variant="headingSm" color="subdued">
          You have not added any datasets yet.
        </Text>
        <Box paddingBlockStart="4">
          <LinkButton href="/dashboard/dataset/new" primary>
            Add New Dataset
          </LinkButton>
        </Box>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';

import { ActionBar } from './components/action-bar';
import { Content } from './components/content';
import styles from './dataset.module.scss';

export default function DatasetPage() {
  const router = useRouter();

  return (
    <div className={styles.DatasetPage}>
      <ActionBar
        title="My Datasets"
        primaryAction={{
          content: 'Add New Dataset',
          onAction: () => router.push('/dashboard/dataset/new'),
        }}
      />
      <Content />
    </div>
  );
}

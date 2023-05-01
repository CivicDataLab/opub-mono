'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ActionBar } from '../components/action-bar';
import { CreateDataset } from './components/new-dataset';
import styles from './new.module.scss';

export default function DatasetPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.prefetch('/dashboard/dataset/1/edit/metadata');
  }, []);

  return (
    <div className={styles.CreatetPage}>
      <ActionBar
        title="Add New Dataset"
        primaryAction={{
          content: 'Save & Next',
          onAction: () => router.push('/dashboard/dataset/1/edit/metadata'),
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => router.push('/dashboard/dataset'),
        }}
        previousPage={{
          content: 'My Datasets',
          link: '/dashboard/dataset',
        }}
      />

      <CreateDataset />
    </div>
  );
}

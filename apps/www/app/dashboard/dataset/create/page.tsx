'use client';

import { useRouter } from 'next/navigation';

import { ActionBar } from '../components/action-bar';
import { Content } from './components/content';
import styles from './create.module.scss';

export default function DatasetPage() {
  const route = useRouter();
  return (
    <div className={styles.CreatetPage}>
      <ActionBar
        title="Add New Dataset"
        primaryAction={{
          content: 'Save & Next',
          onAction: () => {},
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => route.push('/dashboard/dataset'),
        }}
        previousPage={{ content: 'My Datasets', link: '/dashboard/dataset' }}
      />
      <Content />
    </div>
  );
}

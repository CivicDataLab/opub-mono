'use client';

import { useRouter } from 'next/navigation';

import { testDataset } from '@/config/dashboard';
import { ActionBar } from '../../../components/action-bar';
import { EditMetadata } from '../components/EditMetadata';
import styles from '../edit.module.scss';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  // get demo data
  const data = testDataset[params.id];

  return (
    <div className={styles.EditPage}>
      <ActionBar
        title={data.name}
        primaryAction={{
          content: 'Save & Next',
          onAction: () =>
            router.push(`/dashboard/dataset/${params.id}/edit/distribution`),
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => router.push('/dashboard/dataset'),
        }}
      />
      <EditMetadata
        defaultVal={{
          source: '',
          created: '',
          frequency: '',
          tags: [],
          terms: false,
        }}
      />
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';

import { testDataset } from '@/config/dashboard';
import { ActionBar } from '../../components/action-bar';
import { EditDataset } from './components/EditDataset';
import styles from './edit.module.scss';

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
            router.push(`/dashboard/dataset/${params.id}/edit/metadata`),
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => router.push('/dashboard/dataset'),
        }}
      />
      <EditDataset
        defaultVal={{
          type: 'file',
          name: data.name,
          description: data.description,
          terms: true,
        }}
      />
    </div>
  );
}

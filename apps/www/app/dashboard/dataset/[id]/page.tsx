'use client';

import { useRouter } from 'next/navigation';

import { testDataset } from '@/config/dashboard';
import { InProgress } from '../../components/in-progress';
import { ActionBar } from '../components/action-bar';
import styles from '../dataset.module.scss';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  // get demo data
  const data = testDataset[params.id];
  console.log(data);

  return (
    <div className={styles.DatasetPage}>
      <ActionBar
        title={data.name}
        primaryAction={{
          content: 'Add New Dataset',
          onAction: () => router.push('/dashboard/dataset/new'),
        }}
      />
      <InProgress />
    </div>
  );
}

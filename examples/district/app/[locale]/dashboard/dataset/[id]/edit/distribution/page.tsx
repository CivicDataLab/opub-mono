'use client';

import React from 'react';
import { notFound, useRouter } from 'next/navigation';

import { testDataset } from '@/config/dashboard';
import { ActionBar } from '../../../components/action-bar';
import { EditDistribution } from '../components/EditDistribution';
import styles from '../edit.module.scss';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  // get demo data
  const data = testDataset[params.id];
  if (!data) {
    notFound();
  }

  return (
    <div className={styles.EditPage}>
      <ActionBar
        title={data.name}
        primaryAction={{
          content: 'Save Dataset',
          onAction: () => {
            submitRef.current?.click();
          },
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => router.push('/dashboard/dataset'),
        }}
        previousPage={{
          link: `/dashboard/dataset/${params.id}/edit/metadata`,
          content: 'Edit Metadata',
        }}
      />
      <EditDistribution
        submitRef={submitRef}
        defaultVal={{
          title: '',
          description: '',
          file: undefined,
        }}
      />
    </div>
  );
}

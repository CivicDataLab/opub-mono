'use client';

import React from 'react';
import { notFound, useRouter } from 'next/navigation';

import { testDataset } from '@/config/dashboard';
import { ActionBar } from '../../../components/action-bar';
import { EditMetadata } from '../components/EditMetadata';
import styles from '../edit.module.scss';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    router.prefetch(`/dashboard/dataset/${params.id}/edit/distribution`);
  }, []);

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
          content: 'Save & Next',
          onAction: () => submitRef.current?.click(),
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => router.push('/dashboard/dataset'),
        }}
        previousPage={{
          link: `/dashboard/dataset/${params.id}/edit`,
          content: 'Edit Page',
        }}
      />
      <EditMetadata
        submitRef={submitRef}
        id={params.id}
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

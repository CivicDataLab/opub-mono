'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ActionBar } from '../../components/action-bar';
import { CreateDataset } from '../components/new-dataset';

export const Page = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.prefetch('/dashboard/dataset/1/edit/metadata');
  }, []);

  const submitRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <ActionBar
        title="Add New Dataset"
        primaryAction={{
          content: 'Save & Next',
          onAction: () => submitRef.current?.click(),
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

      <CreateDataset submitRef={submitRef} />
    </>
  );
};

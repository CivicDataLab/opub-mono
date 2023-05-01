'use client';

import { Loading } from '@/components/loading';
import { ActionBar } from './action-bar';

export default function DatasetLoading() {
  return (
    <>
      <ActionBar
        title="Add New Dataset"
        primaryAction={{
          content: 'Save & Next',
          onAction: () => {},
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => {},
        }}
        previousPage={{
          content: 'My Datasets',
          link: '/dashboard/dataset',
        }}
      />
      <Loading />;
    </>
  );
}

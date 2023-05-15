'use client';

import { Loading } from '@/components/loading';
import { ActionBar } from './action-bar';

export default function DatasetLoading({
  previousPage,
}: {
  previousPage?: boolean;
}) {
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
        previousPage={
          previousPage
            ? {
                content: 'My Datasets',
                link: '#',
              }
            : undefined
        }
      />
      <Loading />;
    </>
  );
}

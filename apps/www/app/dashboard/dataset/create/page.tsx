'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ActionBar } from '../components/action-bar';
import { AddData } from './components/add-data';
import { CreateDataset } from './components/new-dataset';
import styles from './create.module.scss';

export default function DatasetPage() {
  const [page, setPage] = React.useState<'new' | 'data'>('new');
  const [actions, setActions] = React.useState<any>();
  const route = useRouter();

  const newActions = {
    title: 'Add New Dataset',
    primary: () => setPage('data'),
    secondary: () => route.push('/dashboard/dataset'),
    previous: {
      content: 'My Datasets',
      link: '/dashboard/dataset',
    },
  };

  const dataActions = {
    title: 'Rain_Assam',
    primary: () => {},
    secondary: () => route.push('/dashboard/dataset'),
    previous: {
      content: 'Add New Dataset',
      action: () => setPage('new'),
    },
  };

  React.useEffect(() => {
    if (page === 'new') {
      setActions(newActions);
      return;
    }
    setActions(dataActions);
  }, [page]);

  return (
    <div className={styles.CreatetPage}>
      {actions && (
        <ActionBar
          title={actions.title}
          primaryAction={{
            content: 'Save & Next',
            onAction: actions.primary,
          }}
          secondaryAction={{
            content: 'Cancel',
            onAction: actions.secondary,
          }}
          previousPage={actions.previous}
        />
      )}

      {page === 'new' ? <CreateDataset /> : <AddData />}
    </div>
  );
}

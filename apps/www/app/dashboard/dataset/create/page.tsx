'use client';

import { ActionBar } from '../components/action-bar';
import styles from './create.module.scss';

export default function DatasetPage() {
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
          onAction: () => {},
        }}
        previousPage={{ content: 'My Datasets', link: '/dashboard/dataset' }}
      />
      {/* <Content /> */}
    </div>
  );
}

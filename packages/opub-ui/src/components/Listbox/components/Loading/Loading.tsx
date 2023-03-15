import { Spinner } from '@ui/components/Spinner';
import React, { memo, useEffect } from 'react';
import { useListbox } from '../../utils';
import styles from './Loading.module.scss';

export interface LoadingProps {
  children?: React.ReactNode;
  accessibilityLabel: string;
}

export const Loading = memo(function LoadingOption({
  children,
  accessibilityLabel: label,
}: LoadingProps) {
  const { setLoading } = useListbox();

  useEffect(() => {
    setLoading(label);
    return () => {
      setLoading(undefined);
    };
  }, [label, setLoading]);

  return (
    <li className={styles.ListItem} role="presentation">
      {children ? (
        children
      ) : (
        <div className={styles.Loading}>
          <Spinner size="small" accessibilityLabel={label} />
        </div>
      )}
    </li>
  );
});

import React from 'react';
import { useToggle } from 'usehooks-ts';

import { cn } from '../../utils';
import styles from './Connected.module.scss';

type ItemPosition = 'left' | 'right' | 'primary';

export interface ItemProps {
  /** Position of the item */
  position: ItemPosition;
  /** Item content */
  children?: React.ReactNode;
}

export function Item({ children, position }: ItemProps) {
  const [focused, _, setFocus] = useToggle(false);

  const className = cn(
    styles.Item,
    focused && styles['Item-focused'],
    position === 'primary' ? styles['Item-primary'] : styles['Item-connection']
  );

  return (
    <div
      className={className}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {children}
    </div>
  );
}

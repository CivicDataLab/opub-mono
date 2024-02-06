import React from 'react';

import { cn } from '../../utils';
import { useToggle } from '../../utils/hooks/use-toggle';
import styles from './Connected.module.scss';

type ItemPosition = 'left' | 'right' | 'primary';

export interface ItemProps {
  /** Position of the item */
  position: ItemPosition;
  /** Item content */
  children?: React.ReactNode;
}

export function Item({ children, position }: ItemProps) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused,
  } = useToggle(false);

  const className = cn(
    styles.Item,
    focused && styles['Item-focused'],
    position === 'primary' ? styles['Item-primary'] : styles['Item-connection']
  );

  return (
    <div
      onBlur={forceFalseFocused}
      onFocus={forceTrueFocused}
      className={className}
    >
      {children}
    </div>
  );
}

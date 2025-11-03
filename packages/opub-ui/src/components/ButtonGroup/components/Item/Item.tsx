import React from 'react';
import { useToggle } from 'usehooks-ts';

import { cn } from '../../../../utils';
import styles from '../../ButtonGroup.module.scss';

export interface ItemProps {
  button: React.ReactElement;
}

export function Item({ button }: ItemProps) {
  const [focused, _, setFocus] = useToggle(false);

  const className = cn(
    styles.Item,
    focused && styles['Item-focused'],
    button.props.plain && styles['Item-plain']
  );

  return (
    <div
      className={className}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {button}
    </div>
  );
}

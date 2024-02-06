import React from 'react';
import * as CollapsibleDemo from '@radix-ui/react-collapsible';
import { IconMinus, IconPlus } from '@tabler/icons-react';

import { CollapsibleProps } from '../../types/collapsible';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import styles from './Collapsible.module.scss';

export const Collapsible = ({
  collapsibleHeading,
  collapsibleContent,
}: CollapsibleProps) => {
  const [open, setOpen] = React.useState(false);

  const className = cn(styles.CollapsibleRoot);
  const iconSource = open ? IconMinus : IconPlus;
  return (
    <CollapsibleDemo.Root
      className={className}
      open={open}
      onOpenChange={setOpen}
    >
      <div className={styles.Container}>
        <span className={styles.Text}>{collapsibleHeading}</span>
        <CollapsibleDemo.Trigger asChild>
          <button className={styles.IconButton}>
            <Icon source={iconSource} size={24} />
          </button>
        </CollapsibleDemo.Trigger>
      </div>

      <CollapsibleDemo.Content className={styles.Content}>
        {collapsibleContent.map((text: string, key: any) => {
          return (
            <div className={styles.Repository} key={`collapsible_text${key}`}>
              <span className={styles.Text}>{text}</span>
            </div>
          );
        })}
      </CollapsibleDemo.Content>
    </CollapsibleDemo.Root>
  );
};

import { CollapsibleProps } from '../../types/collapsible';
import { Icon } from '../Icon';
import styles from './Collapsible.module.scss';
import * as CollapsibleDemo from '@radix-ui/react-collapsible';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import cx from 'classnames';
import React from 'react';

export const Collapsible = ({
  collapsibleHeading,
  collapsibleContent,
}: CollapsibleProps) => {
  const [open, setOpen] = React.useState(false);

  const className = cx(styles.CollapsibleRoot);
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
            <Icon source={iconSource} size="6" />
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

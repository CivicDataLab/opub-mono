import React from 'react';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import styles from './Collapsible.module.scss';
import cx from 'classnames';
import { CollapsibleProps } from '../../types/collapsible';
import * as CollapsibleDemo from '@radix-ui/react-collapsible';

export const Collapsible = ({
  collapsibleHeading,
  collapsibleContent,
}: CollapsibleProps) => {
  const [open, setOpen] = React.useState(false);

  const className = cx(styles.CollapsibleRoot);

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
            {open ? <Cross2Icon /> : <RowSpacingIcon />}
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

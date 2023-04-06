import React from 'react';
import styles from './Collapsible.module.scss';
import cx from 'classnames';
import { CollapsibleProps } from '../../types/collapsible';
import * as CollapsibleDemo from '@radix-ui/react-collapsible';
import { MobilePlusMajor, MinusMinor } from '@shopify/polaris-icons';

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
            {open ? <MinusMinor /> : <MobilePlusMajor />}
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

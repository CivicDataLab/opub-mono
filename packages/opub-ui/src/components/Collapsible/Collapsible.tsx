import React from 'react';
import * as CollapsibleDemo from '@radix-ui/react-collapsible'
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import styles from './Collapsible.module.scss';
import cx from 'classnames';

const Collapsible = () => {
  const [open, setOpen] = React.useState(false);

  const className = cx(
    styles.CollapsibleRoot,
  );

  return (
    <CollapsibleDemo.Root className={className}  open={open} onOpenChange={setOpen}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className={styles.Text} style={{ color: 'black' }}>
          @peduarte starred 3 repositories
        </span>
        <CollapsibleDemo.Trigger asChild>
           <button className={styles.IconButton}>{open ? <Cross2Icon /> : <RowSpacingIcon />}</button> 
        </CollapsibleDemo.Trigger>
      </div>

      <div className={styles.Repository}>
        <span className={styles.Text}>@radix-ui/primitives</span>
      </div>

      <CollapsibleDemo.Content>
        <div className={styles.Repository}>
          <span className={styles.Text}>@radix-ui/colors</span>
        </div>
        <div className={styles.Repository}>
          <span className={styles.Text}>@stitches/react</span>
        </div>
      </CollapsibleDemo.Content>
    </CollapsibleDemo.Root>
  );
};

export default Collapsible;

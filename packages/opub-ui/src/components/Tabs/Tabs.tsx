import * as TabsRadix from '@radix-ui/react-tabs';
import cx from 'classnames';
import { forwardRef } from 'react';
import styles from './Tabs.module.scss';

type Props = {} & TabsRadix.TabsProps;

const Tabs = forwardRef((props: Props, ref: any) => {
  const themeClass = cx(styles.Root, {});

  return (
    <TabsRadix.Root
      className={`opub-Tabs ${themeClass}`}
      ref={ref}
      {...props}
    />
  );
});

type ListProps = {
  /** Fit tabs to container */
  fitted?: boolean;
  /** Text to replace disclosures horizontal dots */
  disclosureText?: string;
} & TabsRadix.TabsListProps;

const TabList = forwardRef((props: ListProps, ref: any) => {
  const { fitted, disclosureText, ...others } = props;
  const classname = cx(styles.Tabs, fitted && styles.fitted);

  return <TabsRadix.List className={classname} {...others} ref={ref} />;
});

const Tab = forwardRef(
  ({ children, ...props }: TabsRadix.TabsTriggerProps, ref: any) => {
    const classname = cx(styles.TabContainer);

    return (
      <div className={classname}>
        <TabsRadix.Trigger {...props} ref={ref} asChild>
          <button className={styles.Tab}>
            <span className={styles.Title}>{children}</span>
          </button>
        </TabsRadix.Trigger>
      </div>
    );
  }
);

const TabPanel = forwardRef((props: TabsRadix.TabsContentProps, ref: any) => {
  return <TabsRadix.Content {...props} ref={ref} />;
});

export { Tabs, TabList, Tab, TabPanel };

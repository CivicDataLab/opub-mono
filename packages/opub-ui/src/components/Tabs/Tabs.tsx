import { Text } from '../Text';
import styles from './Tabs.module.scss';
import * as TabsRadix from '@radix-ui/react-tabs';
import cx from 'classnames';
import { forwardRef } from 'react';

type Props = {} & TabsRadix.TabsProps;

const Tabs = forwardRef((props: Props, ref: any) => {
  const { className, ...others } = props;

  return (
    <TabsRadix.Root
      className={`opub-Tabs ${className}`}
      ref={ref}
      {...others}
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
  const { fitted, disclosureText, className, ...others } = props;
  const classname = cx(styles.TabList, fitted && styles.fitted, className);

  return <TabsRadix.List className={classname} {...others} ref={ref} />;
});

type TabProps = {
  activeBorder?: boolean;
} & TabsRadix.TabsTriggerProps;

const Tab = forwardRef(
  (
    { children, className, activeBorder = true, ...props }: TabProps,
    ref: any
  ) => {
    return (
      <TabsRadix.Trigger {...props} ref={ref} asChild>
        <button
          className={cx(
            styles.Tab,
            activeBorder && styles.ActiveBorder,
            className
          )}
        >
          <Text className={styles.Title} variant="bodyMd">
            {children}
          </Text>
        </button>
      </TabsRadix.Trigger>
    );
  }
);

const TabPanel = forwardRef((props: TabsRadix.TabsContentProps, ref: any) => {
  return <TabsRadix.Content {...props} ref={ref} />;
});

export { Tabs, TabList, Tab, TabPanel };

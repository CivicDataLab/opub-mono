import { forwardRef } from 'react';
import * as TabsRadix from '@radix-ui/react-tabs';

import { IconProps } from '../../types';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import { Text } from '../Text';
import styles from './Tabs.module.scss';

type Props = {} & TabsRadix.TabsProps;

const Tabs = forwardRef((props: Props, ref: any) => {
  const { className, ...others } = props;

  return (
    <TabsRadix.Root
      className={cn('opub-Tabs', className)}
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
  border?: boolean;
  /** Grey track with a white selected chip. Optional icons on Tab. */
  boxed?: boolean;
} & TabsRadix.TabsListProps;

const TabList = forwardRef((props: ListProps, ref: any) => {
  const { fitted, disclosureText, border, boxed, className, ...others } =
    props;
  const classname = cn(
    styles.TabList,
    fitted && styles.fitted,
    border && styles.border,
    boxed && styles.boxed,
    className
  );

  return <TabsRadix.List className={classname} {...others} ref={ref} />;
});

type TabProps = {
  activeBorder?: boolean;
  theme?: 'climate' | 'default' | 'dataSpace';
  /** Icon shown before the label. Intended for boxed TabList. */
  icon?: IconProps['source'];
} & TabsRadix.TabsTriggerProps;

const Tab = forwardRef(
  (
    {
      children,
      className,
      activeBorder = true,
      theme,
      icon,
      ...props
    }: TabProps,
    ref: any
  ) => {
    return (
      <TabsRadix.Trigger {...props} ref={ref} asChild>
        <button
          className={cn(
            styles.Tab,
            activeBorder && styles.ActiveBorder,
            theme === 'climate' && styles.ActiveBorderClimateTheme,
            theme === 'dataSpace' && styles.ActiveBorderDataSpaceTheme,
            className
          )}
        >
          {icon ? (
            <span className={styles.TabIcon}>
              <Icon source={icon} size={20} stroke={1.5} />
            </span>
          ) : null}
          <Text
            className={cn(
              theme === 'climate'
                ? styles.TitleClimateTheme
                : theme === 'dataSpace'
                  ? styles.TitleDataSpaceTheme
                  : styles.Title
            )}
            variant="bodyMd"
          >
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

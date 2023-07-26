import { Text } from '../Text';
import styles from './Breadcrumbs.module.scss';
import cx from 'classnames';
import React from 'react';

type Props = {
  crumbs: {
    label: string;
    href: string;
  }[];
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
};

const className = cx(styles.Breadcrumbs);

const Breadcrumbs = ({
  crumbs,
  itemsBeforeCollapse,
  itemsAfterCollapse,
}: Props) => {
  const [collapsed, setCollapsed] = React.useState(true);

  React.useEffect(() => {
    if (itemsBeforeCollapse && itemsAfterCollapse) {
      if (itemsBeforeCollapse < 1 || itemsAfterCollapse < 1) {
        throw new Error('Please enter a positive number');
      }
      const totalVisibleItems = itemsBeforeCollapse + itemsAfterCollapse;
      setCollapsed(totalVisibleItems >= crumbs.length ? false : true);
    } else {
      setCollapsed(false);
    }
  }, [crumbs, itemsBeforeCollapse, itemsAfterCollapse]);

  const visibleCrumbsBeforeCollapse = collapsed
    ? [...crumbs.slice(0, itemsBeforeCollapse)]
    : crumbs;

  const visibleCrumbsAfterCollapse = collapsed
    ? itemsAfterCollapse
      ? [...crumbs.slice(-itemsAfterCollapse)]
      : []
    : [];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={styles.List}>
        {visibleCrumbsBeforeCollapse.length > 0 &&
          visibleCrumbsBeforeCollapse.map((crumb: any, index: any) => (
            <BreacrumbItem key={`crumb_item${index}`} crumb={crumb} />
          ))}
        {collapsed && (
          <li className={styles.CollapseItem}>
            <span
              className={styles.CollapseToggle}
              onClick={() => setCollapsed(!collapsed)}
            >
              {'\u2026'}
            </span>
          </li>
        )}
        {visibleCrumbsAfterCollapse.length > 0 &&
          visibleCrumbsAfterCollapse.map((crumb: any, index: any) => (
            <BreacrumbItem key={`crumb_item${index}`} crumb={crumb} />
          ))}
      </ol>
    </nav>
  );
};

export { Breadcrumbs };

const BreacrumbItem = ({
  crumb,
}: {
  crumb: { label: string; href: string };
}) => {
  return (
    <li className={styles.ListItem}>
      <Text variant="headingXs" color="subdued" fontWeight="regular">
        <a href={crumb.href}>{crumb.label}</a>
      </Text>
    </li>
  );
};

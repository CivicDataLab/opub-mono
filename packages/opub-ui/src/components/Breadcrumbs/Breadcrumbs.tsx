import React from 'react';
import styles from './Breadcrumbs.module.scss';
import cx from 'classnames';

type Props = {
  crumbs: any;
  selected: (crumb: any) => void;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
};

const className = cx(styles.Breadcrumbs);

const Breadcrumbs = ({
  crumbs,
  selected,
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
            <li key={`crumb_item${index}`} className={styles.ListItem}>
              <button
                className={`${styles.Button} ${styles.ButtonLink}`}
                onClick={() => selected(crumb)}
              >
                {crumb}
              </button>
            </li>
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
            <li key={`crumb_item${index}`} className={styles.ListItem}>
              <button
                className={`${styles.Button} ${styles.ButtonLink}`}
                onClick={() => selected(crumb)}
              >
                {crumb}
              </button>
            </li>
          ))}
      </ol>
    </nav>
  );
};

export { Breadcrumbs };

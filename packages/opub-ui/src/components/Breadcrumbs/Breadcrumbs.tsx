import React from 'react';
import styles from './Breadcrumbs.module.scss';
import cx from 'classnames';

type Props = {
  crumbs: any;
  selected: (crumb: any) => void;
  maxItems?: number;
};

const className = cx(styles.Breadcrumbs);

const Breadcrumbs = ({ crumbs, selected, maxItems = 20 }: Props) => {
  const [collapsed, setCollapsed] = React.useState(
    maxItems > crumbs.length ? false : true
  );
  const visibleCrumbs = collapsed
    ? maxItems == 1
      ? [crumbs[0]]
      : [crumbs[0], ...crumbs.slice(-maxItems + 1)]
    : crumbs;
  const hasMoreCrumbs = crumbs.length > maxItems;

  return (
    <nav className={className}>
      <ol className={styles.List}>
        {visibleCrumbs.length > 0 && (
          <li className={styles.ListItem}>
            <button
              className={`${styles.Button} ${styles.ButtonLink}`}
              onClick={() => selected(visibleCrumbs[0])}
            >
              {visibleCrumbs[0]}
            </button>
          </li>
        )}
        {collapsed && hasMoreCrumbs && (
          <li className={styles.CollapseItem}>
            <span
              className={styles.CollapseToggle}
              onClick={() => setCollapsed(!collapsed)}
            >
              {'\u2026'}
            </span>
          </li>
        )}
        {visibleCrumbs.slice(1).map((crumb: any, index: any) => (
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

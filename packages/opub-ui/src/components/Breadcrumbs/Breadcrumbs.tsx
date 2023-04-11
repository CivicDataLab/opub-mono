import React from 'react';
import styles from './Breadcrumbs.module.scss';
import cx from 'classnames';

type Props = {
  crumbs: any;
  selected: (crumb: any) => void;
};

const className = cx(styles.Breadcrumbs);

const Breadcrumbs = ({ crumbs, selected }: Props) => {
  return (
    <nav className={className}>
      <ol className={styles.List}>
        {crumbs.map((crumb: any, index: any) => {
          return (
            <li key={`crumb_item${index}`} className={styles.ListeItem}>
              <button
                className={`${styles.Button} ${styles.ButtonLink}`}
                onClick={() => selected(crumb)}
              >
                {crumb}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export { Breadcrumbs };

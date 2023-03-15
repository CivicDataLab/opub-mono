import { ReactNode, useId } from 'react';
import { SectionContext } from './context';
import styles from './Section.module.scss';
import { listboxSectionDataSelector } from './selectors';
import cx from 'classnames';

interface SectionProps {
  divider?: boolean;
  children?: ReactNode;
  title: ReactNode;
}

export function Section({ children, divider = true, title }: SectionProps) {
  const sectionId = useId();

  return (
    <SectionContext.Provider value={sectionId}>
      <li role="presentation" {...listboxSectionDataSelector.props}>
        {title}
        <ul
          role="group"
          aria-labelledby={sectionId}
          className={cx(styles.SectionGroup, !divider && styles.noDivider)}
        >
          {children}
        </ul>
      </li>
    </SectionContext.Provider>
  );
}

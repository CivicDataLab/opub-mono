import React from 'react';
import styles from '../../CodeBlock.module.scss';

interface Props {
  children: React.ReactNode;
}

const Collapse = ({ children }: Props) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  return (
    <div className={styles.Collapse}>
      <div
        className={styles.CollapseContent}
        style={
          {
            '--code-collapse-height': isCollapsed ? '200px' : '100%',
            '--mask': isCollapsed
              ? 'linear-gradient(to bottom,var(--ds-background-neutral-bold, black) 25%,transparent'
              : null,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
      <div className={styles.CollapseTrigger}>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'Expand' : 'Collapse'} Code
        </button>
      </div>
    </div>
  );
};

export { Collapse };

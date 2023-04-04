import React from 'react';
import cx from 'classnames';
interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: 'violet' | 'cyan' | 'yellow';
}

export const Pre = React.forwardRef(
  ({ children }: Props, ref: React.LegacyRef<HTMLPreElement>) => {
    return (
      <pre className={cx('OPub-CodeBlock')} ref={ref}>
        {children}
      </pre>
    );
  }
);

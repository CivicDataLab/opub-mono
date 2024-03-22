import React, { Children, memo } from 'react';
import type { NamedExoticComponent } from 'react';

import { Group, Item } from './components';
import styles from './FormLayout.module.scss';
import { isElementOfType, wrapWithComponent } from './utils';

export interface FormLayoutProps {
  /** The content to display inside the layout. */
  children?: any;
}

export const FormLayout = memo(function FormLayout({
  children,
}: FormLayoutProps) {
  return (
    <div className={styles.FormLayout}>
      {Children.map(children, wrapChildren)}
    </div>
  );
}) as NamedExoticComponent<FormLayoutProps> & {
  Group: typeof Group;
};

FormLayout.Group = Group;

function wrapChildren(child: React.ReactElement, index: number) {
  if (isElementOfType(child, Group)) {
    return child;
  }
  const props = {};
  return wrapWithComponent(child, Item, props);
}

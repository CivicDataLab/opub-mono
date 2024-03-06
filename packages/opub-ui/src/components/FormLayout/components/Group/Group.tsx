import React, { Children } from 'react';

import { cn, wrapWithComponent } from '../../../../utils';
import styles from '../../FormLayout.module.scss';
import { Item } from '../Item';

export interface GroupProps {
  children?: React.ReactNode;
  condensed?: boolean;
  title?: string;
  helpText?: React.ReactNode;
}

export function Group({ children, condensed, title, helpText }: GroupProps) {
  const className = cn(condensed ? styles.condensed : styles.grouped);

  const id = React.useId();

  let helpTextElement = null;
  let helpTextID: undefined | string;
  let titleElement = null;
  let titleID: undefined | string;

  if (helpText) {
    helpTextID = `${id}HelpText`;
    helpTextElement = (
      <div id={helpTextID} className="pb-2 pl-5 pr-5 text-textSubdued">
        {helpText}
      </div>
    );
  }

  if (title) {
    titleID = `${id}Title`;
    titleElement = (
      <div id={titleID} className={styles.Title}>
        {title}
      </div>
    );
  }

  const itemsMarkup = Children.map(children, (child) =>
    wrapWithComponent(child, Item, {})
  );

  return (
    <div
      role="group"
      className={className}
      aria-labelledby={titleID}
      aria-describedby={helpTextID}
    >
      {titleElement}
      <div className={styles.Items}>{itemsMarkup}</div>
      {helpTextElement}
    </div>
  );
}

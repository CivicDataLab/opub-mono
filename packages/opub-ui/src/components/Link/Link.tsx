import { UnstyledLink } from './BaseLink';
import styles from './Link.module.scss';
import cx from 'classnames';
import React from 'react';

export interface LinkProps {
  /** ID for the link */
  id?: string;
  /** The url to link to */
  url?: string;
  /** The content to display inside the link */
  children?: React.ReactNode;
  /** Makes the link open in a new tab */
  external?: boolean;
  /** Makes the link color the same as the current text color and adds an underline */
  monochrome?: boolean;
  /** Removes text decoration underline to the link*/
  removeUnderline?: boolean;
  /** Callback when a link is clicked */
  onClick?(): void;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
  /** Indicates whether or not the link is the primary navigation link when rendered inside of an `DataTable.Row` */
  dataPrimaryLink?: boolean;
}

export function Link({
  url,
  children,
  onClick,
  external,
  id,
  monochrome,
  removeUnderline,
  accessibilityLabel,
  dataPrimaryLink,
}: LinkProps) {
  const className = cx(
    styles.Link,
    monochrome && styles.monochrome,
    removeUnderline && styles.removeUnderline
  );

  return url ? (
    <UnstyledLink
      onClick={onClick}
      className={className}
      url={url}
      external={external}
      id={id}
      aria-label={accessibilityLabel}
      data-primary-link={dataPrimaryLink}
    >
      {children}
    </UnstyledLink>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={className}
      id={id}
      aria-label={accessibilityLabel}
      data-primary-link={dataPrimaryLink}
    >
      {children}
    </button>
  );
}

import React, { forwardRef, LegacyRef } from 'react';
import styles from './Thumbnail.module.scss';
import cx from 'classnames';

import { variationName } from '../../utils/css';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface ThumbnailProps {
  /**
   * Size of thumbnail
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
  source: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  /** Alt text for the thumbnail image */
  alt: string;
  /** Transparent background */
  transparent?: boolean;
}

export const Thumbnail = forwardRef(
  (
    { source, alt, size = 'medium', transparent }: ThumbnailProps,
    ref: LegacyRef<HTMLSpanElement>
  ) => {
    const className = cx(
      styles.Thumbnail,
      size && styles[variationName('size', size)],
      transparent && styles.transparent
    );

    const Icon = source;
    const content =
      typeof source === 'string' ? <img alt={alt} src={source} /> : <Icon />;

    return (
      <span className={className} ref={ref}>
        {content}
      </span>
    );
  }
);

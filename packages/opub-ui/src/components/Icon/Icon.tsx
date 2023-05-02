import { SpacingSpaceScale } from '../../tokens';
import { variationName } from '../../utils/css';
import { Text } from '../Text';
import styles from './Icon.module.scss';
import cx from 'classnames';
import React from 'react';

type Color =
  | 'base'
  | 'subdued'
  | 'critical'
  | 'interactive'
  | 'warning'
  | 'highlight'
  | 'success'
  | 'primary'
  | 'magic';

export type IconSource =
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  | 'placeholder'
  | string;

export interface IconProps {
  /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
  source: IconSource;
  /** Set the color for the SVG fill */
  color?: Color;
  /** Show a backdrop behind the icon */
  backdrop?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
  /** size of the icon, use space tokens  */
  size?: SpacingSpaceScale;
}

export function Icon({
  source,
  color,
  backdrop,
  accessibilityLabel,
  size,
}: IconProps) {
  let sourceType: 'function' | 'placeholder' | 'external';
  if (typeof source === 'function' || typeof source === 'object') {
    sourceType = 'function';
  } else if (source === 'placeholder') {
    sourceType = 'placeholder';
  } else {
    sourceType = 'external';
  }

  const className = cx(
    styles.Icon,
    color && styles[variationName('color', color)],
    color && styles.applyColor,
    backdrop && styles.hasBackdrop
  );

  const SourceComponent = source;
  const contentMarkup = {
    function: (
      <SourceComponent
        className={styles.Svg}
        focusable="false"
        aria-hidden="true"
      />
    ),
    placeholder: <div className={styles.Placeholder} />,
    external: (
      <img
        className={styles.Img}
        src={`data:image/svg+xml;utf8,${source}`}
        alt=""
        aria-hidden="true"
      />
    ),
  };

  return (
    <span
      className={className}
      style={
        size
          ? { height: `var(--space-${size})`, width: `var(--space-${size})` }
          : {}
      }
    >
      <Text as="span" visuallyHidden>
        {accessibilityLabel}
      </Text>
      {contentMarkup[sourceType]}
    </span>
  );
}

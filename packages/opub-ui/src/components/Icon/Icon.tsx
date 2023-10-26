import { IconProps } from '../../types';
import { variationName } from '../../utils/css';
import { Text } from '../Text';
import styles from './Icon.module.scss';
import cx from 'classnames';
import React from 'react';

export function Icon({
  source,
  color,
  backdrop,
  accessibilityLabel,
  size,
  stroke,
  fill,
  className,
  noEvents,
}: IconProps) {
  let sourceType: 'function' | 'placeholder' | 'external';
  if (typeof source === 'function' || typeof source === 'object') {
    sourceType = 'function';
  } else if (source === 'placeholder') {
    sourceType = 'placeholder';
  } else {
    sourceType = 'external';
  }

  const classes = cx(
    styles.Icon,
    color && styles[variationName('color', color)],
    backdrop && styles.hasBackdrop,
    'OPub-Icon',
    className
  );

  const SourceComponent: any = source;
  const iconSize = size
    ? typeof size === 'number'
      ? size
      : Number(size) * 4
    : 20;

  const contentMarkup = {
    function: (
      <SourceComponent
        className={styles.Svg}
        size={iconSize}
        color="currentColor"
        focusable="false"
        aria-hidden="true"
        stroke={stroke ? stroke : 2}
        style={{
          '--fill': fill ? `var(--icon-${fill})` : 'none',
          pointerEvents: noEvents ? 'none' : 'auto',
        }}
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
      className={classes}
      style={
        size
          ? ({
              height: iconSize,
              width: iconSize,
              '--fill': fill ? `var(--icon-${fill})` : 'none',
            } as React.CSSProperties)
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

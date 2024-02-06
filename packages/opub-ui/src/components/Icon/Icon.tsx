import { IconProps } from '../../types';
import { cn, variationName } from '../../utils/css';
import { Text } from '../Text';
import styles from './Icon.module.scss';

export function Icon({
  source,
  color = 'default',
  backdrop,
  accessibilityLabel,
  size,
  stroke,
  className,
  noEvents,
}: IconProps) {
  const classes = cn(
    styles.Icon,
    color && styles[variationName('color', color)],
    backdrop && styles.hasBackdrop,
    'OPub-Icon',
    className
  );

  const SourceComponent: any = source;
  const iconSize = size ? size : 20;

  const style = {
    height: size ? size : iconSize,
    width: size ? size : iconSize,
    color: `var(--icon-${convertToCSSVariable(color)})`,
  };

  return (
    <span className={classes} style={style}>
      <Text as="span" visuallyHidden>
        {accessibilityLabel}
      </Text>
      <SourceComponent
        className={styles.Svg}
        size={iconSize}
        color={`var(--icon-${convertToCSSVariable(color)})`}
        focusable="false"
        aria-hidden="true"
        stroke={stroke ? stroke : 2}
        style={{
          pointerEvents: noEvents ? 'none' : 'auto',
        }}
      />
    </span>
  );
}

function convertToCSSVariable(string: string) {
  if (string.includes('onBg')) {
    const split = string.split('onBg')[1];
    return `onbg-${split.toLocaleLowerCase()}`;
  }
  return string;
}

export type { IconProps };

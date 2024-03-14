import { Color } from '../../types/icon';
import { cn } from '../../utils';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  /**
   * Size of spinner
   * @default '20'
   */
  size?: number;
  /**
   * Show Aria Live Region
   * @default false
   */
  ariaLive?: boolean;
  /**
   * Color of spinner
   * @default default
   */
  color?:
    | 'default'
    | 'surface'
    | 'success'
    | 'warning'
    | 'critical'
    | 'interactive'
    | 'highlight';
}

export function Spinner({
  size = 20,
  ariaLive = false,
  color = 'default',
}: SpinnerProps) {
  return (
    <div
      className={cn(styles.Spinner_Wrapper)}
      style={
        {
          '--spinner-size': `${size}px`,
          '--spinner-color': `var(--icon-${mapColorToIconColor(color)})`,
        } as React.CSSProperties
      }
    >
      {ariaLive && <div aria-live="polite" role="status" />}
      <div className={styles.Spinner}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.Spinner_Bar} />
        ))}
      </div>
    </div>
  );
}

function mapColorToIconColor(color: SpinnerProps['color']) {
  switch (color) {
    case 'surface':
      return 'onbg-default';
    default:
      return color;
  }
}

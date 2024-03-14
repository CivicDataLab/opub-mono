import styles from './Spinner.module.scss';

export interface SpinnerProps {
  /**
   * Size of spinner
   * @default '20'
   */
  size?: number;
}

export function Spinner({ size = 20 }: SpinnerProps) {
  return (
    <div
      className={styles.Spinner_Wrapper}
      style={
        {
          '--spinner-size': `${size}px`,
        } as React.CSSProperties
      }
      aria-live="polite"
      role="status"
    >
      <div className={styles.Spinner}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.Spinner_Bar} />
        ))}
      </div>
    </div>
  );
}

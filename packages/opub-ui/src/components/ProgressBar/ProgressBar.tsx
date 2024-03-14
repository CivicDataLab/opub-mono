import React, { forwardRef, Ref } from 'react';
import * as Progress from '@radix-ui/react-progress';

import { ProgressBarProps } from '../../types/progressbar';
import { cn, variationName } from '../../utils/css';
import styles from './ProgressBar.module.scss';

const ProgressBar = forwardRef(
  (props: ProgressBarProps, ref: Ref<HTMLDivElement>) => {
    const {
      value,
      size = 'medium',
      color = 'highlight',
      customColor,
      animated = true,
      ...others
    } = props;
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(value), 500);
      return () => clearTimeout(timer);
    }, []);

    const themeClass = cn(
      styles.Root,
      size && styles[variationName('size', size)],
      color && styles[variationName('color', color)]
    );

    return (
      <Progress.Root
        className={`opub-ProgressBar ${themeClass}`}
        value={progress}
        ref={ref}
        style={
          customColor
            ? ({
                '--op-progress-bar-background': customColor?.backgroundColor,
                '--op-progress-bar-indicator': customColor?.indicatorColor,
              } as React.CSSProperties)
            : {}
        }
        {...others}
      >
        <Progress.Indicator
          className={styles.Indicator}
          style={
            {
              transform: `translateX(-${100 - progress}%)`,
              '--op-progress-bar-duration': animated ? '500ms' : '0ms',
            } as React.CSSProperties
          }
        />
      </Progress.Root>
    );
  }
);

export { ProgressBar };

import React, { forwardRef, Ref } from 'react';
import * as Progress from '@radix-ui/react-progress';

import { motion } from '../../tokens/motion';
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
      color && styles[variationName('color', color)],
      customColor && styles[variationName('customColor', customColor)],
    );

    const progressBarDuration = animated
      ? motion['duration-500'].value
      : motion['duration-0'].value;

    return (
      <Progress.Root
        className={`opub-ProgressBar ${themeClass}`}
        value={progress}
        ref={ref}
        {...others}
      >
        <Progress.Indicator
          className={styles.Indicator}
          style={
            {
              transform: `translateX(-${100 - progress}%)`,
              '--op-progress-bar-duration': progressBarDuration,
            } as React.CSSProperties
          }
        />
      </Progress.Root>
    );
  }
);

export { ProgressBar };

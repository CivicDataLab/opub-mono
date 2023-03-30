import * as Progress from '@radix-ui/react-progress';
import { motion } from '../../tokens/motion';
import { ProgressBarProps } from '../../types/progressbar';
import { variationName } from '../../utils/css';
import cx from 'classnames';
import React, { forwardRef, Ref } from 'react';
import styles from './ProgressBar.module.scss';

const ProgressBar = forwardRef(
  (props: ProgressBarProps, ref: Ref<HTMLDivElement>) => {
    const {
      value,
      size = 'medium',
      color = 'highlight',
      animated = true,
      ...others
    } = props;
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(value), 500);
      return () => clearTimeout(timer);
    }, []);

    const themeClass = cx(
      styles.Root,
      size && styles[variationName('size', size)],
      color && styles[variationName('color', color)]
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

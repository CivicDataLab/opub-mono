import { Icon } from '../../../Icon';
import styles from '../../Input.module.scss';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';
import React from 'react';

type HandleStepFn = (step: number) => void;

export interface SpinnerProps {
  onChange: HandleStepFn;
  onClick?(event: React.MouseEvent): void;
  onMouseDown(onChange: HandleStepFn): void;
  onMouseUp(): void;
  onBlur(event: React.FocusEvent): void;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner({ onChange, onClick, onMouseDown, onMouseUp, onBlur }, ref) {
    function handleStep(step: number) {
      return () => onChange(step);
    }

    function handleMouseDown(onChange: HandleStepFn) {
      return (event: React.MouseEvent) => {
        if (event.button !== 0) return;
        onMouseDown(onChange);
      };
    }

    return (
      <div className={styles.Spinner} onClick={onClick} aria-hidden ref={ref}>
        <button
          className={styles.Segment}
          tabIndex={-1}
          onClick={handleStep(1)}
          onMouseDown={handleMouseDown(handleStep(1))}
          onMouseUp={onMouseUp}
          onBlur={onBlur}
        >
          <div className={styles.SpinnerIcon}>
            <Icon source={IconCaretUp} />
          </div>
        </button>
        <button
          className={styles.Segment}
          tabIndex={-1}
          onClick={handleStep(-1)}
          onMouseDown={handleMouseDown(handleStep(-1))}
          onMouseUp={onMouseUp}
          onBlur={onBlur}
        >
          <div className={styles.SpinnerIcon}>
            <Icon source={IconCaretDown} />
          </div>
        </button>
      </div>
    );
  }
);

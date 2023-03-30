import { TimeValue } from '@react-types/datepicker';
import React from 'react';
import { AriaTimeFieldProps, useLocale, useTimeField } from 'react-aria';
import { TimeFieldStateOptions, useTimeFieldState } from 'react-stately';
import { DateFieldSegment } from '../DateField';
import { Labelled } from '../Labelled';
import cx from 'classnames';
import inputStyles from '../Input/Input.module.scss';
import styles from './TimeField.module.scss';

type Props = {} & (TimeFieldStateOptions | AriaTimeFieldProps<TimeValue>);

function TimeField(props: Props) {
  let { locale } = useLocale();
  let state = useTimeFieldState({
    ...props,
    locale,
  });

  let ref = React.useRef(null);
  let { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <Labelled label={props.label} {...labelProps}>
      <div className={styles.TimeField}>
        <div className={inputStyles.TextField}>
          <div
            {...fieldProps}
            ref={ref}
            className={cx(styles.InputField, inputStyles.Input)}
          >
            {state.segments.map((segment, i) => (
              <DateFieldSegment key={i} segment={segment} state={state} />
            ))}
          </div>
          <div className={inputStyles.Backdrop} />
        </div>
      </div>
    </Labelled>
  );
}

export { TimeField };

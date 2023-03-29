import { createCalendar } from '@internationalized/date';
import { DatePickerBase, DateValue } from '@react-types/datepicker';
import cx from 'classnames';
import React from 'react';
import {
  AriaDateFieldProps,
  useDateField,
  useDateSegment,
  useLocale,
} from 'react-aria';
import {
  DateFieldState,
  DateFieldStateOptions,
  DateSegment,
  useDateFieldState,
} from 'react-stately';
import styles from './DateField.module.scss';

type Props = {} & (DateFieldStateOptions | AriaDateFieldProps<DateValue>);

function DateField(props: Props) {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = React.useRef(null);
  let { labelProps, fieldProps } = useDateField(props, state, ref);
  const themeClass = cx(styles.DateField, {});

  return (
    <div className={`opub-DateField ${themeClass}`}>
      <span {...labelProps}>{props.label}</span>
      <div {...fieldProps} ref={ref} className={styles.Field}>
        {state.segments.map((segment, i) => (
          <DateFieldSegment key={i} segment={segment} state={state} />
        ))}
        {state.validationState === 'invalid' && (
          <span aria-hidden="true">🚫</span>
        )}
      </div>
    </div>
  );
}

interface DatePickerSegmentProps extends DatePickerBase<DateValue> {
  segment: DateSegment;
  state: DateFieldState;
}

function DateFieldSegment({ segment, state }: DatePickerSegmentProps) {
  let ref = React.useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);
  const classname = cx(
    styles.Segment,
    segment.isPlaceholder && styles.Placeholder
  );

  return (
    <div {...segmentProps} ref={ref} className={classname}>
      {segment.text}
    </div>
  );
}

export { DateField };

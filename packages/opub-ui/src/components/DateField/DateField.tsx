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
import inputStyles from '../Input/Input.module.scss';
import { Labelled } from '../Labelled';
import styles from './DateField.module.scss';

type Props = {
  isRange?: boolean;
  trim?: boolean;
} & (DateFieldStateOptions | AriaDateFieldProps<DateValue>);

function DateField(props: Props) {
  const { trim, isRange, ...others } = props;
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...others,
    locale,
    createCalendar,
  });

  let ref = React.useRef(null);
  let { labelProps, fieldProps } = useDateField(others, state, ref);

  const themeClass = cx(styles.DateField, {});
  const inputMarkup = (
    <div className={`opub-DateField ${themeClass}`}>
      <div className={inputStyles.TextField}>
        <div
          {...fieldProps}
          ref={ref}
          className={cx(
            styles.InputField,
            inputStyles.Input,
            trim && styles.Trim
          )}
        >
          {state.segments.map((segment, i) => (
            <DateFieldSegment key={i} segment={segment} state={state} />
          ))}
        </div>
        {!isRange && <div className={inputStyles.Backdrop} />}
      </div>
    </div>
  );

  return (
    <Labelled label={props.label} {...labelProps}>
      {inputMarkup}
    </Labelled>
  );
}

interface DatePickerSegmentProps extends DatePickerBase<DateValue> {
  segment: DateSegment;
  state: DateFieldState;
}

export function DateFieldSegment({ segment, state }: DatePickerSegmentProps) {
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

import { GregorianCalendar } from '@internationalized/date';
import {
  AriaDatePickerProps,
  DatePickerBase,
  DateValue,
} from '@react-types/datepicker';
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
import { DateTimeProps } from '../../types/datetime';
import inputStyles from '../Input/Input.module.scss';
import { Labelled } from '../Labelled';
import styles from './DateField.module.scss';

function createCalendar(identifier: any) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
}

export type DatFieldProps = {
  isRange?: boolean;
  trim?: boolean;
  isPicker?: boolean;
} & DateTimeProps &
  (DateFieldStateOptions | AriaDateFieldProps<DateValue>);

function DateField(props: DatFieldProps) {
  const {
    trim,
    isRange,
    helpText,
    label,
    labelAction,
    labelHidden,
    requiredIndicator,
    errorMessage,
    isPicker,
    ...others
  } = props;
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
  if (isPicker) {
    return inputMarkup;
  }

  return (
    <Labelled
      error={state.validationState === 'invalid' && errorMessage}
      label={label}
      helpText={helpText}
      labelHidden={labelHidden}
      action={labelAction}
      requiredIndicator={requiredIndicator}
      {...labelProps}
    >
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

type RangeProps = {
  startFieldProps: AriaDatePickerProps<DateValue>;
  endFieldProps: AriaDatePickerProps<DateValue>;
};

const DateRangeField = ({ startFieldProps, endFieldProps }: RangeProps) => {
  return (
    <div className={cx(styles.RangeField, inputStyles.TextField)}>
      <DateField isPicker trim isRange {...startFieldProps} />
      <span>{'-'}</span>
      <DateField isPicker trim isRange {...endFieldProps} />
      <div className={inputStyles.Backdrop} />
    </div>
  );
};

export { DateField, DateRangeField };

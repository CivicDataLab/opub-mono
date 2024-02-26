'use client';

import React from 'react';
import { GregorianCalendar } from '@internationalized/date';
import {
  AriaDatePickerProps,
  DatePickerBase,
  DateValue,
} from '@react-types/datepicker';
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
import { cn } from '../../utils';
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

const DateField = React.forwardRef((props: any, _) => {
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
    autoCapitalize,
    ...others
  } = props;
  let { locale } = useLocale();
  let ref = React.useRef(null);

  let state = useDateFieldState({
    ...others,
    locale,
    createCalendar,
  });

  let { labelProps, fieldProps } = useDateField(others, state, ref);

  const themeClass = cn(styles.DateField);
  const inputMarkup = (
    <div className={`opub-DateField ${themeClass}`}>
      <div
        className={cn(inputStyles.TextField, errorMessage && inputStyles.error)}
      >
        <div
          {...fieldProps}
          ref={ref}
          className={cn(
            styles.InputField,
            inputStyles.Input,
            trim && styles.Trim
          )}
        >
          {state.segments.map((segment, i) => (
            <DateFieldSegment key={i} segment={segment} state={state} />
          ))}
        </div>
        {!isRange && !isPicker && <div className={inputStyles.Backdrop} />}
      </div>
    </div>
  );
  if (isPicker) {
    return inputMarkup;
  }

  return (
    <Labelled
      error={state.isInvalid && errorMessage}
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
});

interface DatePickerSegmentProps extends DatePickerBase<DateValue> {
  segment: DateSegment;
  state: DateFieldState;
}

export function DateFieldSegment({ segment, state }: DatePickerSegmentProps) {
  let ref = React.useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);
  const classname = cn(
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
    <div className={cn(styles.RangeField, inputStyles.TextField)}>
      <DateField isPicker trim isRange {...startFieldProps} />
      <span>{'-'}</span>
      <DateField isPicker trim isRange {...endFieldProps} />
    </div>
  );
};

export { DateField, DateRangeField };

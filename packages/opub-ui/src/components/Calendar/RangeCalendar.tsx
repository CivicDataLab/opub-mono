'use client';

import React from 'react';
import { GregorianCalendar } from '@internationalized/date';
import { AriaRangeCalendarProps, DateValue } from '@react-types/calendar';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useLocale, useRangeCalendar } from 'react-aria';
import {
  RangeCalendarStateOptions,
  useRangeCalendarState,
} from 'react-stately';

import { cn } from '../../utils';
import { Icon } from '../Icon';
import { Text } from '../Text';
import styles from './Calendar.module.scss';
import { CalendarGrid } from './components/CalendarGrid';

function createCalendar(identifier: any) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
}

type Props = RangeCalendarStateOptions | AriaRangeCalendarProps<DateValue>;

function RangeCalendar(props: Props) {
  let { locale } = useLocale();
  let state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = React.useRef(null);
  const themeClass = cn(styles.Calendar);

  let { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref);

  const {
    onPress: onPressPrev,
    isDisabled: disabledPrev,
    onFocusChange,

    ...othersPrev
  } = prevButtonProps;
  const {
    onPress: onPressNext,
    isDisabled: disabledNext,
    onFocusChange: _,
    ...othersNext
  } = nextButtonProps;

  return (
    <div {...calendarProps} ref={ref} className={`opub-Calendar ${themeClass}`}>
      <div className={styles.Header}>
        <button
          onClick={() => state.focusPreviousPage()}
          disabled={disabledPrev}
          {...othersPrev}
        >
          <Icon source={IconArrowLeft} color="default" />
        </button>

        <Text variant="bodyMd">{title}</Text>
        <button
          onClick={() => state.focusNextPage()}
          disabled={disabledNext}
          {...othersNext}
        >
          <Icon source={IconArrowRight} color="default" />
        </button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}

export { RangeCalendar };

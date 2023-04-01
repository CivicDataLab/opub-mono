import { createCalendar } from '@internationalized/date';
import { AriaRangeCalendarProps, DateValue } from '@react-types/calendar';
import { ArrowLeftMinor, ArrowRightMinor } from '@shopify/polaris-icons';
import cx from 'classnames';
import React from 'react';
import { useLocale, useRangeCalendar } from 'react-aria';
import {
  RangeCalendarStateOptions,
  useRangeCalendarState,
} from 'react-stately';
import { Icon } from '../Icon';
import { Text } from '../Text';
import styles from './Calendar.module.scss';
import { CalendarGrid } from './components/CalendarGrid';

type Props = {} & (
  | RangeCalendarStateOptions
  | AriaRangeCalendarProps<DateValue>
);

function RangeCalendar(props: Props) {
  let { locale } = useLocale();
  let state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = React.useRef(null);
  const themeClass = cx(styles.Calendar, {});

  let { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref);

  const {
    onPress: onPressPrev,
    isDisabled: disabledPrev,
    ...othersPrev
  } = prevButtonProps;
  const {
    onPress: onPressNext,
    isDisabled: disabledNext,
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
          <Icon source={ArrowLeftMinor} color="base" />
        </button>

        <Text variant="bodyMd">{title}</Text>
        <button
          onClick={() => state.focusNextPage()}
          disabled={disabledNext}
          {...othersNext}
        >
          <Icon source={ArrowRightMinor} color="base" />
        </button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}

export { RangeCalendar };

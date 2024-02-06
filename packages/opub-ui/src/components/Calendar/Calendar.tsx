'use client';

import { forwardRef, LegacyRef } from 'react';
import { GregorianCalendar } from '@internationalized/date';
import { AriaCalendarProps, DateValue } from '@react-types/calendar';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useCalendar, useLocale } from 'react-aria';
import { CalendarStateOptions, useCalendarState } from 'react-stately';

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

type Props = {
  isRangeSelector?: boolean;
} & (CalendarStateOptions | AriaCalendarProps<DateValue>);

const Calendar = forwardRef(
  (props: Props, ref: LegacyRef<HTMLDivElement> | undefined) => {
    let { locale } = useLocale();

    let state = useCalendarState({
      ...props,
      locale,
      createCalendar,
    });

    let { calendarProps, prevButtonProps, nextButtonProps, title } =
      useCalendar(props, state);
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

    const themeClass = cn(styles.Calendar);
    return (
      <div
        {...calendarProps}
        ref={ref}
        className={`opub-Calendar ${themeClass}`}
      >
        <div className={styles.Header}>
          <button
            onClick={() => state.focusPreviousPage()}
            disabled={disabledPrev}
            {...othersPrev}
          >
            <Icon source={IconArrowLeft} />
          </button>

          <Text variant="bodyMd">{title}</Text>
          <button
            onClick={() => state.focusNextPage()}
            disabled={disabledNext}
            {...othersNext}
          >
            <Icon source={IconArrowRight} />
          </button>
        </div>
        <CalendarGrid state={state} />
      </div>
    );
  }
);

export { Calendar };

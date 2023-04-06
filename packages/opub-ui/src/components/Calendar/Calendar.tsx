import { GregorianCalendar } from '@internationalized/date';
import { AriaCalendarProps, DateValue } from '@react-types/calendar';
import { ArrowLeftMinor, ArrowRightMinor } from '@shopify/polaris-icons';
import cx from 'classnames';
import { forwardRef, LegacyRef } from 'react';
import { useCalendar, useLocale } from 'react-aria';
import { CalendarStateOptions, useCalendarState } from 'react-stately';
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

    const themeClass = cx(styles.Calendar, {});
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
);

export { Calendar };

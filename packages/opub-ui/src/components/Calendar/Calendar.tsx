import { createCalendar } from '@internationalized/date';
import { createDOMRef } from '@react-spectrum/utils';
import { AriaCalendarProps, DateValue } from '@react-types/calendar';
import { ArrowLeftMinor, ArrowRightMinor } from '@shopify/polaris-icons';
import { FocusableRef } from '@ui/types/shared/refs';
import cx from 'classnames';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useCalendar, useLocale } from 'react-aria';
import { CalendarStateOptions, useCalendarState } from 'react-stately';
import { Icon } from '../Icon';
import { Text } from '../Text';
import styles from './Calendar.module.scss';
import { CalendarGrid } from './components/CalendarGrid';

type Props = {
  isRangeSelector?: boolean;
} & (CalendarStateOptions | AriaCalendarProps<DateValue>);

const Calendar = forwardRef((props: Props, ref: FocusableRef<HTMLElement>) => {
  let { locale } = useLocale();

  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  let domRef = React.useRef(null);
  useImperativeHandle(ref, () => ({
    ...createDOMRef(domRef),
    focus() {
      state.setFocused(true);
    },
  }));

  const themeClass = cx(styles.Calendar, {});
  return (
    <div
      {...calendarProps}
      ref={domRef}
      className={`opub-Calendar ${themeClass}`}
    >
      <div className={styles.Header}>
        <button onClick={() => state.focusPreviousPage()} {...prevButtonProps}>
          <Icon source={ArrowLeftMinor} color="base" />
        </button>

        <Text variant="bodyMd">{title}</Text>
        <button onClick={() => state.focusNextPage()} {...nextButtonProps}>
          <Icon source={ArrowRightMinor} color="base" />
        </button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
});

export { Calendar };

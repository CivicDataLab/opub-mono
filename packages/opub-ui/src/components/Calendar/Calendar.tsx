import React, { forwardRef, useImperativeHandle } from 'react';
import styles from './Calendar.module.scss';
import cx from 'classnames';
import { useCalendar, useLocale } from 'react-aria';
import { CalendarStateOptions, useCalendarState } from 'react-stately';
import { createCalendar } from '@internationalized/date';
import { Button } from '../Button';
import { CalendarGrid } from './components/CalendarGrid';
import { FocusableRef } from '@ui/types/shared/refs';
import { AriaCalendarProps, DateValue } from '@react-types/calendar';
import { createDOMRef } from '@react-spectrum/utils';
import { Text } from '../Text';
import { ArrowLeftMinor, ArrowRightMinor } from '@shopify/polaris-icons';
import { Icon } from '../Icon';

type Props = {} & (CalendarStateOptions | AriaCalendarProps<DateValue>);

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
    <div {...calendarProps} className={`opub-Calendar ${themeClass}`}>
      <div className={styles.Header}>
        <Button
          size="slim"
          icon={<Icon source={ArrowLeftMinor} />}
          plain
          onClick={() => state.focusPreviousPage()}
          {...prevButtonProps}
        />
        <Text variant="bodyMd">{title}</Text>
        <Button
          size="slim"
          icon={<Icon source={ArrowRightMinor} />}
          plain
          onClick={() => state.focusNextPage()}
          {...nextButtonProps}
        />
      </div>
      <CalendarGrid state={state} />
    </div>
  );
});

export { Calendar };

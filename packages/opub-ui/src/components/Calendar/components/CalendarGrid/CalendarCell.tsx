import React from 'react';
import { useCalendarCell, AriaCalendarCellProps } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';
import { CalendarDate } from '@internationalized/date';
import cx from 'classnames';
import styles from '../../Calendar.module.scss';
import { Text } from '@ui/components/Text';

interface CalendarCellProps extends AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
}

export function CalendarCell({ state, date, ...props }: CalendarCellProps) {
  let ref = React.useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  const classname = cx(
    styles.Cell,
    isSelected && styles.Selected,
    isDisabled && styles.Disabled,
    isUnavailable && styles.Unavailable
  );

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={classname}
      >
        <Text variant="bodySm">{formattedDate}</Text>
      </div>
    </td>
  );
}

import { CalendarDate, isSameDay, isToday } from '@internationalized/date';
import { Text } from '@ui/Text';
import cx from 'classnames';
import React from 'react';
import { AriaCalendarCellProps, useCalendarCell } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';
import styles from '../../Calendar.module.scss';

interface CalendarCellProps extends AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
}

export function CalendarCell({ state, date }: CalendarCellProps) {
  let ref = React.useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    isInvalid,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  let highlightedRange = 'highlightedRange' in state && state.highlightedRange;
  let isSelectionStart =
    isSelected && highlightedRange && isSameDay(date, highlightedRange.start);
  let isSelectionEnd =
    isSelected && highlightedRange && isSameDay(date, highlightedRange.end);

  const classname = cx(
    styles.Cell,
    isToday(date, state.timeZone) && styles.Today,
    isSelected && styles.Selected,
    isDisabled && !isInvalid && styles.Disabled,
    isUnavailable && styles.Unavailable,
    isSelectionStart && styles.SelectionStart,
    isSelectionEnd && styles.SelectionEnd,
    highlightedRange && styles.HighlightedRange
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

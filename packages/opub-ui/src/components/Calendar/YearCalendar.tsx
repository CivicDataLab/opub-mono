import React, { useRef } from 'react';
import { createCalendar } from '@internationalized/date';
import { DateValue } from '@react-types/calendar';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import {
  AriaCalendarProps,
  useCalendar,
  useCalendarCell,
  useDateFormatter,
  useLocale,
} from 'react-aria';
import {
  CalendarState,
  CalendarStateOptions,
  useCalendarState,
} from 'react-stately';

import { YearCalendarLabels } from '../../types/datetime';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import { Text } from '../Text';
import styles from './Calendar.module.scss';

// Month numbers laid out as the 3x4 grid. Names are formatted per locale at
// render time (see Cell), so no month strings are hardcoded here.
const monthsObj: { [key: number]: { value: number }[] } = {
  0: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
  1: [{ value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }],
  2: [{ value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }],
};

export const YearCalendar = (
  props: (CalendarStateOptions<DateValue> | AriaCalendarProps<DateValue>) & {
    /** Localizable strings. Falls back to English defaults. */
    labels?: YearCalendarLabels;
  }
) => {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef<any>(null);
  let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );

  function PrevButton() {
    const { isDisabled, onPress, onFocusChange, ...otherProps } =
      prevButtonProps;
    return (
      <button
        {...otherProps}
        onClick={() =>
          state.setFocusedDate(state.focusedDate.subtract({ years: 1 }))
        }
      >
        <Icon source={IconArrowLeft} />
      </button>
    );
  }

  function NextButton() {
    const { isDisabled, onPress, onFocusChange, ...otherProps } =
      nextButtonProps;
    return (
      <button
        {...otherProps}
        onClick={() =>
          state.setFocusedDate(state.focusedDate.add({ years: 1 }))
        }
      >
        <Icon source={IconArrowRight} />
      </button>
    );
  }

  const themeClass = cn(styles.Calendar, styles.YearCalendar);
  return (
    <div className={`opub-Calendar ${themeClass}`} {...calendarProps} ref={ref}>
      <div className={styles.Header}>
        <PrevButton />
        <YearDropdown state={state} />
        <NextButton />
      </div>

      <MonthSelector state={state} labels={props.labels} />
    </div>
  );
};

function YearDropdown({ state }: { state: CalendarState }) {
  let formatter = useDateFormatter({
    year: 'numeric',
    timeZone: state.timeZone,
  });
  let date = state.focusedDate;

  return (
    <Text fontWeight="semibold">
      {formatter.format(date.toDate(state.timeZone))}
    </Text>
  );
}

function MonthSelector({
  state,
  labels,
}: {
  state: CalendarState;
  labels?: YearCalendarLabels;
}) {
  React.useEffect(() => {
    const nextFocusElm = document.querySelector(
      `[data-label="${state.focusedDate.month}, ${state.focusedDate.year}"]`
    ) as HTMLElement;
    nextFocusElm?.focus();
  }, [state.focusedDate]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTableElement>) {
    let updatedDate;
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        updatedDate = state.focusedDate.subtract({ months: 4 });
        state.setFocusedDate(updatedDate);
        break;
      case 'ArrowDown':
        e.preventDefault();
        updatedDate = state.focusedDate.add({ months: 4 });
        state.setFocusedDate(updatedDate);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        updatedDate = state.focusedDate.subtract({ months: 1 });
        state.setFocusedDate(updatedDate);
        break;
      case 'ArrowRight':
        e.preventDefault();
        updatedDate = state.focusedDate.add({ months: 1 });
        state.setFocusedDate(updatedDate);
        break;
    }
  }

  const calendar = [...new Array(3).keys()].map((_, i) => {
    return (
      <tr key={i}>
        {monthsObj[i].map((mon) => {
          return (
            <Cell key={mon.value} mon={mon} state={state} labels={labels} />
          );
        })}
      </tr>
    );
  });

  return (
    <table role="grid" onKeyDown={handleKeyDown}>
      <tbody className="mt-2 flex flex-col gap-2">{calendar}</tbody>
    </table>
  );
}

const Cell = ({
  mon,
  state,
  labels,
}: {
  mon: { value: number };
  state: CalendarState;
  labels?: YearCalendarLabels;
}) => {
  let date = state.focusedDate.set({ month: mon.value });

  // Localized month names from the active locale (via the nearest
  // <I18nProvider>, falling back to the runtime locale). The day is fixed to
  // the 1st in local time to avoid the UTC-midnight off-by-one.
  const monthShortFormatter = useDateFormatter({ month: 'short' });
  const monthLongFormatter = useDateFormatter({ month: 'long' });
  const nameDate = new Date(state.focusedDate.year, mon.value - 1, 1);
  const monthShort = monthShortFormatter.format(nameDate);
  const monthLong = monthLongFormatter.format(nameDate);

  const { minValue, maxValue } = state;
  const isDisabled =
    (minValue && date.compare(minValue) < 0) ||
    (maxValue && date.compare(maxValue) > 0);

  const isSelected =
    state.value?.month === mon.value &&
    state.focusedDate.year === state.value?.year;

  const classname = cn(
    styles.Cell,
    styles.YearCell,
    isSelected && styles.Selected,
    isDisabled && styles.Disabled
  );

  let handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isDisabled) return;

    const value = Number((e.target as HTMLElement).getAttribute('value'));
    let date = state.focusedDate.set({ month: value });

    state.setFocusedDate(date);
    state.setValue(date);
  };

  const ariaLabel = `${monthLong}, ${state.focusedDate.year}${
    isSelected ? `, ${labels?.selected ?? 'selected'}` : ''
  }`;

  return (
    <td aria-selected={isSelected} role="gridcell">
      <button
        onClick={handleClick}
        className={classname}
        value={mon.value}
        aria-disabled={isDisabled ? true : undefined}
        aria-label={ariaLabel}
        data-label={`${mon.value}, ${state.focusedDate.year}`}
      >
        <Text color="subdued">{monthShort}</Text>
      </button>
    </td>
  );
};

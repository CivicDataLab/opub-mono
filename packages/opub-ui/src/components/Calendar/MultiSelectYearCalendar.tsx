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

import { cn } from '../../utils';
import { Icon } from '../Icon';
import { Text } from '../Text';
import styles from './Calendar.module.scss';

const monthsObj: {
  [key: number]: { month: string; value: number; label: string }[];
} = {
  0: [
    { month: 'Jan', value: 1, label: 'January' },
    { month: 'Feb', value: 2, label: 'February' },
    { month: 'Mar', value: 3, label: 'March' },
    { month: 'Apr', value: 4, label: 'April' },
  ],
  1: [
    { month: 'May', value: 5, label: 'May' },
    { month: 'Jun', value: 6, label: 'June' },
    { month: 'Jul', value: 7, label: 'July' },
    { month: 'Aug', value: 8, label: 'August' },
  ],
  2: [
    { month: 'Sep', value: 9, label: 'September' },
    { month: 'Oct', value: 10, label: 'October' },
    { month: 'Nov', value: 11, label: 'November' },
    { month: 'Dec', value: 12, label: 'December' },
  ],
};

interface MultiSelectYearCalendarProps {
  maxSelections?: number;
  disabledMonths?: DateValue[];
  yearRange?: { start: number; end: number };

  // onSelectionChange: (
  //   selections: {
  //     year: number;
  //     month: number;
  //     formatted: string;
  //   }[]
  // ) => void;

  value?: DateValue[] | null;

  defaultValues?: DateValue[];

  onChange?: (dates: DateValue[]) => void;
}

export const MultiSelectYearCalendar = (
  props: MultiSelectYearCalendarProps
) => {
  const { locale } = useLocale();

  const [selectedDates, setSelectedDates] = React.useState<DateValue[]>(
    props.value || []
  );

  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
    value: selectedDates[selectedDates.length - 1] || null,
    defaultValue: props.defaultValues?.[props.defaultValues.length - 1] || null,
    onChange: (date) => {
      if (!date) return;

      const exists = selectedDates.some((d) => d.compare(date) === 0);
      let newDates: DateValue[];

      if (exists) {
        newDates = selectedDates.filter((d) => d.compare(date) !== 0);
      } else {
        newDates = [...selectedDates, date];
      }

      setSelectedDates(newDates);
      props.onChange?.(newDates);
    },
  });

  let ref = useRef<any>(null);
  let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    {
      ...props,
      value: state.value,
    } as AriaCalendarProps<DateValue>,
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

      <MonthSelector
        state={state}
        selectedDates={selectedDates}
        defaultValue={props.defaultValues}
      />
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
  selectedDates,
  defaultValue,
}: {
  state: CalendarState;
  selectedDates: DateValue[];
  defaultValue?: DateValue[];
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
      case 'Enter':
        e.preventDefault();
        updatedDate = state.focusedDate;
        state.setFocusedDate(updatedDate);
        break;
    }
  }

  const calendar = [...new Array(3).keys()].map((_, i) => {
    return (
      <tr key={i}>
        {monthsObj[i].map((mon) => {
          return (
            <Cell
              key={mon.value}
              mon={mon}
              state={state}
              selectedDates={selectedDates}
              defaultValue={defaultValue}
            />
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
  selectedDates,
  defaultValue,
}: {
  mon: { month: string; value: number; label: string };
  state: CalendarState;
  selectedDates: DateValue[];
  defaultValue?: DateValue[];
}) => {
  let date = state.focusedDate.set({ month: mon.value });

  const { minValue, maxValue } = state;
  const isDisabled =
    (minValue && date.compare(minValue) < 0) ||
    (maxValue && date.compare(maxValue) > 0);

  const isSelected = selectedDates.some(
    (date) => date.month === mon.value && date.year === state.focusedDate.year
  );

  const classname = cn(
    styles.Cell,
    styles.YearCell,
    isSelected && styles.Selected,
    isDisabled && styles.Disabled
  );

  let handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isDisabled) return;

    const value = Number((e.target as HTMLElement).getAttribute('value'));
    let date = state.focusedDate.set({ month: value, day: 1 });

    state.setValue(date);

    state.setFocusedDate(date);
  };

  return (
    <td aria-selected={isSelected} role="gridcell">
      <button
        onClick={handleClick}
        className={classname}
        value={mon.value}
        aria-label={`${mon.label}, ${state.focusedDate.year}`}
        data-label={`${mon.value}, ${state.focusedDate.year}`}
      >
        <Text color="subdued">{mon.month}</Text>
      </button>
    </td>
  );
};

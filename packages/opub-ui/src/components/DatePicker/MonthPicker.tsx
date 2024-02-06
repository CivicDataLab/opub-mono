'use client';

import React from 'react';
import { DateValue } from '@react-types/calendar';
import { IconCalendar } from '@tabler/icons-react';
import { AriaDatePickerProps, useDatePicker } from 'react-aria';
import { DatePickerState, useDatePickerState } from 'react-stately';

import { cn } from '../../utils';
import { YearCalendar } from '../Calendar/YearCalendar';
import { DateField } from '../DateField';
import { IconButton } from '../IconButton';
import inputStyles from '../Input/Input.module.scss';
import { Labelled, LabelledProps } from '../Labelled';
import { Popover } from '../Popover';
import styles from './DatePicker.module.scss';

export type DatePickerProps = {
  /** Label for the field */
  label: string;
  /** Error to display beneath the label */
  error?: any;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Visual required indicator, add an asterisk to label */
  requiredIndicator?: boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
} & (DatePickerState | AriaDatePickerProps<DateValue>);

const MonthPicker = React.forwardRef(
  (
    {
      error,
      labelAction,
      labelHidden,
      helpText,
      requiredIndicator,
      ...props
    }: DatePickerProps,
    ref: any
  ) => {
    let state = useDatePickerState(props);

    let { labelProps, fieldProps, buttonProps, dialogProps, calendarProps } =
      useDatePicker(props, state, ref);
    const themeClass = cn(styles.DatePicker);

    const {
      onPress: onPressPrev,
      isDisabled: disabledPrev,
      ...othersProps
    } = buttonProps;

    return (
      <div className={`opub-MonthPicker ${themeClass}`}>
        <Labelled
          label={props.label}
          {...labelProps}
          error={error}
          action={labelAction}
          labelHidden={labelHidden}
          helpText={helpText}
          requiredIndicator={requiredIndicator}
        >
          <div ref={ref} className={styles.Wrapper}>
            <DateField
              {...fieldProps}
              errorMessage={error}
              isPicker
              granularity="month"
            />
            <Popover
              onOpenChange={() =>
                !state.isOpen ? state.open() : state.close()
              }
              open={state.isOpen}
              {...dialogProps}
            >
              <Popover.Trigger>
                <IconButton
                  {...othersProps}
                  icon={IconCalendar}
                  withTooltip={false}
                >
                  trigger calendar
                </IconButton>
              </Popover.Trigger>
              <Popover.Content>
                <YearCalendar {...calendarProps} />
              </Popover.Content>
            </Popover>
            <div className={inputStyles.Backdrop} />
          </div>
        </Labelled>
      </div>
    );
  }
);

export { MonthPicker };

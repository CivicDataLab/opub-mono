'use client';

import React from 'react';
import { DateValue } from '@react-types/calendar';
import { IconCalendar } from '@tabler/icons-react';
import { AriaDateRangePickerProps, useDateRangePicker } from 'react-aria';
import { DateRangePickerState, useDateRangePickerState } from 'react-stately';

import { DateTimeProps } from '../../types/datetime';
import { cn } from '../../utils';
import { RangeCalendar } from '../Calendar';
import { DateRangeField } from '../DateField';
import { IconButton } from '../IconButton';
import inputStyles from '../Input/Input.module.scss';
import { Labelled } from '../Labelled';
import { Popover } from '../Popover';
import styles from './DatePicker.module.scss';

export type RangePickerProps = {
  label: string;
} & Omit<DateTimeProps, 'label'> &
  (DateRangePickerState | AriaDateRangePickerProps<DateValue>);

const DateRangePicker = React.forwardRef(
  (props: RangePickerProps, ref: any) => {
    const {
      helpText,
      label,
      labelAction,
      labelHidden,
      requiredIndicator,
      errorMessage,
    } = props;

    const normalizedProps: any = {
      ...props,
      validationState:
        props.validationState === null ? undefined : props.validationState,
      errorMessage: props.errorMessage
        ? typeof props.errorMessage === 'string'
          ? props.errorMessage
          : undefined
        : undefined,
      value:
        props.value &&
        typeof props.value === 'object' &&
        'start' in props.value &&
        'end' in props.value
          ? {
              start: props.value.start || undefined,
              end: props.value.end || undefined,
            }
          : props.value,
    };
    let state = useDateRangePickerState(normalizedProps);

    let {
      labelProps,
      startFieldProps,
      endFieldProps,
      buttonProps,
      dialogProps,
      calendarProps,
    } = useDateRangePicker(normalizedProps, state, ref);
    const themeClass = cn(styles.DatePicker);

    const {
      onPress: onPressPrev,
      isDisabled: disabledPrev,
      ...othersProps
    } = buttonProps;

    return (
      <div className={`opub-DatePicker ${themeClass}`}>
        <Labelled
          error={state.isInvalid && errorMessage}
          label={label}
          helpText={helpText}
          labelHidden={labelHidden}
          action={labelAction}
          requiredIndicator={requiredIndicator}
          {...labelProps}
        >
          <div ref={ref} className={styles.Wrapper}>
            <DateRangeField
              startFieldProps={startFieldProps}
              endFieldProps={endFieldProps}
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
                <RangeCalendar {...calendarProps} />
              </Popover.Content>
            </Popover>
            <div className={inputStyles.Backdrop} />
          </div>
        </Labelled>
      </div>
    );
  }
);

export { DateRangePicker };

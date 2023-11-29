'use client';

import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { DateField } from '../DateField';
import { Icon } from '../Icon';
import { Labelled, LabelledProps } from '../Labelled';
import { Popover } from '../Popover';
import styles from './DatePicker.module.scss';
import { DateValue } from '@react-types/calendar';
import { IconCalendar } from '@tabler/icons-react';
import cx from 'classnames';
import React from 'react';
import { AriaDatePickerProps, useDatePicker } from 'react-aria';
import { DatePickerState, useDatePickerState } from 'react-stately';

export type DatePickerProps = {
  /** Label for the field */
  label: string;
  /** Error to display beneath the label */
  error?: string | React.ReactNode | React.ReactElement | boolean;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Visual required indicator, add an asterisk to label */
  requiredIndicator?: boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
} & (DatePickerState | AriaDatePickerProps<DateValue>);

const DatePicker = React.forwardRef(
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
    const themeClass = cx(styles.DatePicker);

    const {
      onPress: onPressPrev,
      isDisabled: disabledPrev,
      ...othersProps
    } = buttonProps;

    return (
      <div className={`opub-DatePicker ${themeClass}`}>
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
            <DateField errorMessage={error} isPicker {...fieldProps} />
            <Popover
              onOpenChange={() =>
                !state.isOpen ? state.open() : state.close()
              }
              open={state.isOpen}
              {...dialogProps}
            >
              <Popover.Trigger>
                <Button
                  icon={<Icon source={IconCalendar} color="onBgDefault" />}
                  size="slim"
                  {...othersProps}
                  onClick={() => (!state.isOpen ? state.open() : state.close())}
                />
              </Popover.Trigger>
              <Popover.Content>
                <Calendar {...calendarProps} />
              </Popover.Content>
            </Popover>
          </div>
        </Labelled>
      </div>
    );
  }
);

export { DatePicker };

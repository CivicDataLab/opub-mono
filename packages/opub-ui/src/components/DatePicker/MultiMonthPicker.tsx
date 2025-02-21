'use client';

import React from 'react';
import { DateValue } from '@react-types/calendar';
import { IconCalendar } from '@tabler/icons-react';
import { useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';

import { cn } from '../../utils';
import { MultiSelectYearCalendar } from '../Calendar';
import { IconButton } from '../IconButton';
import inputStyles from '../Input/Input.module.scss';
import { Labelled, LabelledProps } from '../Labelled';
import { Popover } from '../Popover';
import { TextField } from '../TextField';
import styles from './DatePicker.module.scss';

export type MultiMonthDatePickerProps = {
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
  /** Default Value  */
  defaultValues?: DateValue[];
  /* Selected Values */
  selectedValues: DateValue[] | null;
  /* Callback function */
  onChange?: (dates: DateValue[]) => void;
  /* Minimum date before which calendar is disabled*/
  minValue?: DateValue;
  /* Maximum date after which calendar is disabled*/
  maxValue?: DateValue;
};

const MultiMonthPicker = React.forwardRef(
  (
    {
      error,
      labelAction,
      labelHidden,
      helpText,
      requiredIndicator,
      defaultValues,
      onChange,
      ...props
    }: MultiMonthDatePickerProps,
    ref: any
  ) => {
    let [selectedValues, setSelectedValues] = React.useState<DateValue[]>(
      props.selectedValues || []
    );
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
      <div className={`opub-MultiMonthPicker ${themeClass}`}>
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
            <Popover
              onOpenChange={() =>
                !state.isOpen ? state.open() : state.close()
              }
              open={state.isOpen}
              {...dialogProps}
            >
              <Popover.Trigger>
                <div className={styles.TriggerMultiMonth}>
                  <TextField
                    error={error}
                    name=""
                    label={''}
                    placeholder={
                      selectedValues?.length > 0 ? '' : 'select months'
                    }
                    value={
                      selectedValues?.length > 0
                        ? selectedValues
                            .map((date) =>
                              new Intl.DateTimeFormat('en-US', {
                                month: 'short',
                                year: 'numeric',
                              }).format(new Date(date.toString()))
                            )
                            .join(', ')
                        : ''
                    }
                  />
                  <IconButton
                    {...othersProps}
                    icon={IconCalendar}
                    withTooltip={false}
                  >
                    trigger calendar
                  </IconButton>
                </div>
              </Popover.Trigger>
              <Popover.Content>
                <MultiSelectYearCalendar
                  {...calendarProps}
                  value={selectedValues}
                  defaultValues={defaultValues}
                  onChange={(e) => {
                    onChange && onChange(e);
                    setSelectedValues(e);
                  }}
                />
              </Popover.Content>
            </Popover>

            <div className={inputStyles.Backdrop} />
          </div>
        </Labelled>
      </div>
    );
  }
);

export { MultiMonthPicker };

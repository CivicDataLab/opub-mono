'use client';

import React from 'react';
import { createCalendar } from '@internationalized/date';
import { DateValue } from '@react-types/calendar';
import { IconCalendar } from '@tabler/icons-react';
import { AriaDatePickerProps, useDatePicker } from 'react-aria';
import { DatePickerState, useDatePickerState } from 'react-stately';

import { cn } from '../../utils';
import { MultiSelectYearCalendar } from '../Calendar';
import { IconButton } from '../IconButton';
import inputStyles from '../Input/Input.module.scss';
import { Labelled, LabelledProps } from '../Labelled';
import { Popover } from '../Popover';
import { Tag } from '../Tag';
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
            <TextField
              label=""
              error={error}
              name="vertical"
              disabled
              placeholder={selectedValues?.length > 0 ? '' : 'select months'}
              tags={
                <div className="flex flex-wrap gap-1">
                  {selectedValues?.map((tag) => (
                    <Tag
                      onRemove={() => {
                        if (onChange && selectedValues) {
                          const newValues = selectedValues.filter(
                            (t) => t.toString() !== tag.toString()
                          );
                          setSelectedValues(newValues);
                          onChange(newValues);
                        }
                      }}
                      value={tag.toString()}
                      key={tag.toString()}
                    >
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        year: 'numeric',
                      }).format(new Date(tag.toString()))}
                    </Tag>
                  ))}
                </div>
              }
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

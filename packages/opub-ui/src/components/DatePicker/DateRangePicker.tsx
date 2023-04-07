import { DateValue } from '@react-types/calendar';
import { CalendarMinor } from '@shopify/polaris-icons';
import cx from 'classnames';
import React from 'react';
import { AriaDateRangePickerProps, useDateRangePicker } from 'react-aria';
import { DateRangePickerState, useDateRangePickerState } from 'react-stately';
import { DateTimeProps } from '../../types/datetime';
import { Button } from '../Button';
import { RangeCalendar } from '../Calendar';
import { DateRangeField } from '../DateField';
import { Icon } from '../Icon';
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

    let state = useDateRangePickerState(props);

    let {
      labelProps,
      startFieldProps,
      endFieldProps,
      buttonProps,
      dialogProps,
      calendarProps,
    } = useDateRangePicker(props, state, ref);
    const themeClass = cx(styles.DatePicker, {});

    const {
      onPress: onPressPrev,
      isDisabled: disabledPrev,
      ...othersProps
    } = buttonProps;

    return (
      <div className={`opub-DatePicker ${themeClass}`}>
        <Labelled
          error={state.validationState === 'invalid' && errorMessage}
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
                <Button
                  icon={<Icon source={CalendarMinor} />}
                  size="slim"
                  {...othersProps}
                  onClick={() => (!state.isOpen ? state.open() : state.close())}
                />
              </Popover.Trigger>
              <Popover.Content>
                <RangeCalendar {...calendarProps} />
              </Popover.Content>
            </Popover>
          </div>
        </Labelled>
      </div>
    );
  }
);

export { DateRangePicker };

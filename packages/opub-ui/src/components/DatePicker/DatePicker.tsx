import { DateValue } from '@react-types/calendar';
import { CalendarMinor } from '@shopify/polaris-icons';
import cx from 'classnames';
import React from 'react';
import { AriaDatePickerProps, useDatePicker } from 'react-aria';
import { DatePickerState, useDatePickerState } from 'react-stately';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { DateField } from '../DateField';
import { Icon } from '../Icon';
import { Labelled } from '../Labelled';
import { Popover } from '../Popover';
import styles from './DatePicker.module.scss';

export type DatePickerProps = {
  label: string;
} & (DatePickerState | AriaDatePickerProps<DateValue>);

const DatePicker = React.forwardRef((props: DatePickerProps, ref: any) => {
  let state = useDatePickerState(props);

  let { labelProps, fieldProps, buttonProps, dialogProps, calendarProps } =
    useDatePicker(props, state, ref);
  const themeClass = cx(styles.DatePicker, {});

  const {
    onPress: onPressPrev,
    isDisabled: disabledPrev,
    ...othersProps
  } = buttonProps;

  return (
    <div className={`opub-DatePicker ${themeClass}`}>
      <Labelled label={props.label} {...labelProps}>
        <div ref={ref} className={styles.Wrapper}>
          <DateField isPicker {...fieldProps} />
          <Popover
            onOpenChange={() => (!state.isOpen ? state.open() : state.close())}
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
              <Calendar {...calendarProps} />
            </Popover.Content>
          </Popover>
        </div>
      </Labelled>
    </div>
  );
});

export { DatePicker };

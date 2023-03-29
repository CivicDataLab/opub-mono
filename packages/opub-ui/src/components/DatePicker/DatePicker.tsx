import React, { forwardRef } from 'react';
import styles from './DatePicker.module.scss';
import cx from 'classnames';
import { AriaDatePickerProps, useDatePicker } from 'react-aria';
import { DatePickerState, useDatePickerState } from 'react-stately';
// import {Button, Calendar, DateField, Dialog, Popover} from 'your-component-library';
import { DateValue } from '@react-types/calendar';
import { Button } from '../Button';
import { DateField } from '../DateField';
import { Calendar } from '../Calendar';
import { Popover } from '../Popover';
import { Labelled } from '../Labelled';
import { CalendarMajor, CalendarMinor } from '@shopify/polaris-icons';
import { Icon } from '../Icon';

type Props = {
  label: string;
} & (DatePickerState | AriaDatePickerProps<DateValue>);

const DatePicker = forwardRef((props: Props) => {
  let state = useDatePickerState(props);
  let ref = React.useRef(null);
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  const themeClass = cx(styles.DatePicker, {});

  return (
    <div className={`opub-DatePicker ${themeClass}`}>
      <Labelled label={props.label} {...labelProps}>
        <div {...groupProps} ref={ref} className={styles.Wrapper}>
          <DateField {...fieldProps} />
          <Popover
            onOpenChange={() => (!state.isOpen ? state.open() : state.close())}
            open={state.isOpen}
            {...dialogProps}
          >
            <Popover.Trigger>
              <Button
                icon={<Icon source={CalendarMinor} />}
                size="slim"
                // plain
                {...buttonProps}
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

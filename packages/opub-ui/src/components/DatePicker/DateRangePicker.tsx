import cx from 'classnames';
import React, { forwardRef } from 'react';
import { AriaDateRangePickerProps, useDateRangePicker } from 'react-aria';
import { DateRangePickerState, useDateRangePickerState } from 'react-stately';
import styles from './DatePicker.module.scss';
import { DateValue } from '@react-types/calendar';
import { CalendarMinor } from '@shopify/polaris-icons';
import { Button } from '../Button';
import { RangeCalendar } from '../Calendar';
import { DateField } from '../DateField';
import { Icon } from '../Icon';
import { Labelled } from '../Labelled';
import { Popover } from '../Popover';
import inputStyles from '../Input/Input.module.scss';

type Props = {
  label: string;
} & (DateRangePickerState | AriaDateRangePickerProps<DateValue>);

const DateRangePicker = forwardRef((props: Props) => {
  let state = useDateRangePickerState(props);
  let ref = React.useRef(null);
  let {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref);
  const themeClass = cx(styles.DatePicker, {});

  return (
    <div className={`opub-DatePicker ${themeClass}`}>
      <Labelled label={props.label} {...labelProps}>
        <div ref={ref} className={styles.Wrapper}>
          <div className={cx(styles.Field, inputStyles.TextField)}>
            <DateField trim isRange {...startFieldProps} />
            <span>{'-'}</span>
            <DateField trim isRange {...endFieldProps} />
            <div className={inputStyles.Backdrop} />
          </div>

          <Popover
            onOpenChange={() => (!state.isOpen ? state.open() : state.close())}
            open={state.isOpen}
            {...dialogProps}
          >
            <Popover.Trigger>
              <Button
                icon={<Icon source={CalendarMinor} />}
                size="slim"
                {...buttonProps}
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
});

export { DateRangePicker };

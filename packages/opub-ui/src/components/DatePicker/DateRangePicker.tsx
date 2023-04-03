import { DateValue } from '@react-types/calendar';
import { CalendarMinor } from '@shopify/polaris-icons';
import { DateTimeProps } from '../../types/datetime';
import cx from 'classnames';
import React, { forwardRef } from 'react';
import { AriaDateRangePickerProps, useDateRangePicker } from 'react-aria';
import { DateRangePickerState, useDateRangePickerState } from 'react-stately';
import { Button } from '../Button';
import { RangeCalendar } from '../Calendar';
import { DateField } from '../DateField';
import { Icon } from '../Icon';
import inputStyles from '../Input/Input.module.scss';
import { Labelled } from '../Labelled';
import { Popover } from '../Popover';
import styles from './DatePicker.module.scss';

type Props = {
  label: string;
} & Omit<DateTimeProps, 'label'> &
  (DateRangePickerState | AriaDateRangePickerProps<DateValue>);

const DateRangePicker = (props: Props) => {
  const {
    helpText,
    label,
    labelAction,
    labelHidden,
    requiredIndicator,
    errorMessage,
    ...others
  } = props;

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
          <div className={cx(styles.Field, inputStyles.TextField)}>
            <DateField isPicker trim isRange {...startFieldProps} />
            <span>{'-'}</span>
            <DateField isPicker trim isRange {...endFieldProps} />
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
};

export { DateRangePicker };

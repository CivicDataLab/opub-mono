import React from 'react';
import { TimeValue } from '@react-types/datepicker';
import { AriaTimeFieldProps, useLocale, useTimeField } from 'react-aria';
import { TimeFieldStateOptions, useTimeFieldState } from 'react-stately';

import { DateTimeProps } from '../../types/datetime';
import { cn } from '../../utils';
import { DateFieldSegment } from '../DateField';
import inputStyles from '../Input/Input.module.scss';
import { Labelled } from '../Labelled';
import styles from './TimeField.module.scss';

export type TimeFieldProps = {} & DateTimeProps &
  (TimeFieldStateOptions | AriaTimeFieldProps<TimeValue>);

const TimeField = React.forwardRef((props: TimeFieldProps, ref: any) => {
  const {
    helpText,
    label,
    labelAction,
    labelHidden,
    requiredIndicator,
    errorMessage,
  } = props;
  let { locale } = useLocale();
  let state = useTimeFieldState({
    ...props,
    locale,
  });

  let { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <Labelled
      error={state.isInvalid && errorMessage}
      label={label}
      helpText={helpText}
      labelHidden={labelHidden}
      action={labelAction}
      requiredIndicator={requiredIndicator}
      {...labelProps}
    >
      <div className={styles.TimeField}>
        <div className={inputStyles.TextField}>
          <div
            {...fieldProps}
            ref={ref}
            className={cn(styles.InputField, inputStyles.Input)}
          >
            {state.segments.map((segment, i) => (
              <DateFieldSegment key={i} segment={segment} state={state} />
            ))}
          </div>
          <div className={inputStyles.Backdrop} />
        </div>
      </div>
    </Labelled>
  );
});

export { TimeField };

import React from 'react';

import { Option, OptionProps } from '../Option';
import { TextOption } from '../TextOption';
import cx from 'classnames';

import styles from './Action.scss';
import { ActionContext } from '../../utils';

interface ActionProps extends OptionProps {
  icon?: React.ReactNode;
}

export function Action(props: ActionProps) {
  const { selected, disabled, children, icon, divider } = props;

  const iconMarkup = icon && <div className={styles.Icon}>{icon}</div>;

  const className = cx(styles.Action, divider && styles.ActionDivider);

  return (
    <ActionContext.Provider value>
      <Option {...props}>
        <div className={className}>
          <TextOption selected={selected} disabled={disabled}>
            {iconMarkup}
            {children}
          </TextOption>
        </div>
      </Option>
    </ActionContext.Provider>
  );
}

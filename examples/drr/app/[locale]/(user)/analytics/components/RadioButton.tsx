import React from 'react';

import './RadioButton.scss';
import { Text } from 'opub-ui';

const RadioButton = (props: any) => {
  return (
    <div className="RadioButton">
      <input
        id={props.id}
        onChange={props.changed}
        value={props.value}
        type="radio"
        checked={props.isSelected}
      />
      <label htmlFor={props.id} title={props.label}>
        <Text>{props.label}</Text>
      </label>
    </div>
  );
};

export default RadioButton;

import { cn } from '../../utils';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Text } from '../Text';
import styles from './SelectorCard.module.scss';
import React, { forwardRef } from 'react';

type Props = {
  title: string;
  selected: string | React.ReactNode;
  buttonText: string;
  onClick: () => void;
};

const SelectorCard = forwardRef((props: Props, ref: any) => {
  const { title, selected, buttonText, onClick } = props;
  const themeClass = cn(styles.SelectorCard);

  let content;
  if (typeof selected === 'string') {
    content = (
      <Text variant="bodyMd" color="highlight">
        Person Days Generated as a share of Cumulative Projection of Person Days
      </Text>
    );
  } else {
    content = <div className={styles.PillWrapper}>{selected}</div>;
  }

  return (
    <div className={`opub-SelectorCard ${themeClass}`} ref={ref} {...props}>
      <Text variant="headingSmSpaced">{title}</Text>
      {content}
      <Divider />
      <Button variant="interactive" kind="secondary" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
});

export { SelectorCard };

import { UncontrolledCheckbox } from '@ui/components/Checkbox';
import cx from 'classnames';
import React from 'react';
import styles from '../../IndexTable.module.scss';

type Props = {
  children: React.ReactNode;
  row: any;
  classname: string;
};

export const Row = ({ children, row, classname, ...props }: Props) => {
  const [selected, setSelected] = React.useState(false);

  function handleSelection() {
    if (row.getCanSelect()) {
      row.toggleSelected();
      setSelected(!selected);
    }
  }

  React.useEffect(() => {
    setSelected(row.getIsSelected());
  }, [row.getIsSelected()]);

  return (
    <tr
      key={row.id}
      onClick={(e) => {
        handleSelection();
      }}
      className={classname}
    >
      <td className={cx(styles.Cell, styles.Checkbox)}>
        <UncontrolledCheckbox
          checked={selected}
          onCheckedChange={handleSelection}
          name={row.id}
        />
      </td>
      {children}
    </tr>
  );
};

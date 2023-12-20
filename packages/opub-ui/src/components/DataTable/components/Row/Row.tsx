import { Checkbox } from '../../../Checkbox';
import { IconButton } from '../../../IconButton';
import styles from '../../DataTable.module.scss';
import { IconDotsVertical } from '@tabler/icons-react';
import cx from 'classnames';
import React from 'react';

type Props = {
  children: React.ReactNode;
  row: any;
  classname: string;
  hideSelection?: boolean;
};

export const Row = ({ children, row, classname, hideSelection }: Props) => {
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
      {!hideSelection && (
        <td className={cx(styles.Cell, styles.Checkbox)}>
          <Checkbox
            checked={selected}
            onCheckedChange={handleSelection}
            name={row.id}
          />
        </td>
      )}
      {children}
    </tr>
  );
};

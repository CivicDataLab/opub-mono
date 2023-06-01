import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Menu } from '../../../Menu';
import { TextField } from '../../../TextField';
import styles from '../../DataTable.module.scss';
import {
  IconAdjustmentsHorizontal,
  IconSearch,
  IconSquareRoundedPlus,
} from '@tabler/icons-react';

export function Filter() {
  return (
    <div className={styles.Filter}>
      <div className={styles.FilterLeft}>
        <TextField
          name="filter-table"
          label="Filter"
          labelHidden
          placeholder="Filter"
          prefix={<Icon source={IconSearch} />}
          onChange={(e) => console.log(e)}
        />
        <div className={styles.FilterItems}>
          <Menu
            trigger={
              <Button icon={<Icon source={IconSquareRoundedPlus} />}>
                Age
              </Button>
            }
          />
          <Menu
            trigger={
              <Button icon={<Icon source={IconSquareRoundedPlus} />}>
                Status
              </Button>
            }
          />
        </div>
      </div>
      <div className={styles.FilterRight}>
        <div>
          <Menu
            trigger={
              <Button icon={<Icon source={IconAdjustmentsHorizontal} />}>
                View
              </Button>
            }
          />
        </div>
        <div>
          <Menu
            trigger={
              <Button icon={<Icon source={IconAdjustmentsHorizontal} />}>
                Filter
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

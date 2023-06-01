import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Input } from '../../../Input';
import { Menu } from '../../../Menu';
import { TextField } from '../../../TextField';
import styles from '../../DataTable.module.scss';
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react';

export function Filter() {
  return (
    <div className={styles.Filter}>
      <div className={styles.FilterLeft}>
        <TextField
          name="filter-table"
          label="Filter"
          labelHidden
          placeholder="Filter"
          prefix={<Icon source={IconSearch} size="5" />}
          onChange={(e) => console.log(e)}
        />
        <div className={styles.FilterItems}>
          <Menu
            trigger={
              <Button
                icon={<Icon source={IconAdjustmentsHorizontal} size="5" />}
              >
                Text Label
              </Button>
            }
          />
          <Menu
            trigger={
              <Button
                icon={<Icon source={IconAdjustmentsHorizontal} size="5" />}
              >
                Numeric Label
              </Button>
            }
          />
          <Menu trigger={<Button>More Filter</Button>} />
        </div>
      </div>
      <div className={styles.FilterRight}>
        <div>
          <Menu
            trigger={
              <Button
                icon={<Icon source={IconAdjustmentsHorizontal} size="5" />}
              >
                View
              </Button>
            }
          />
        </div>
        <div>
          <Menu
            trigger={
              <Button
                icon={<Icon source={IconAdjustmentsHorizontal} size="5" />}
              >
                Filter
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

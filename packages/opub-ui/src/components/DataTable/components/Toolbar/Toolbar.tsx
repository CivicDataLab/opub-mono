import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Menu } from '../../../Menu';
import { TextField } from '../../../TextField';
import styles from '../../DataTable.module.scss';
import { DataTableViewOptions } from './DataTableViewOptions';
import { DataTableFacetedFilter } from './Filter';
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react';

export const priorities = [
  {
    label: 'Relationship',
    value: 'relationship',
  },
  {
    label: 'Complicated',
    value: 'complicated',
  },
  {
    label: 'Single',
    value: 'single',
  },
];

export function Toolbar({ table }: { table: any }) {
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
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={priorities}
          />
        </div>
      </div>
      <div className={styles.FilterRight}>
        <div>
          <DataTableViewOptions table={table} />
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

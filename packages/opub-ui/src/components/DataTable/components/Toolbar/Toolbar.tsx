import {
  IconAdjustmentsHorizontal,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';

import { TableFilterProps } from '../../../../types/datatable';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Menu } from '../../../Menu';
import { TextField } from '../../../TextField';
import styles from '../../DataTable.module.scss';
import { DataTableFilter } from './DataTableFilter';
import { DataTableView } from './DataTableView';

interface DataTableViewOptionsProps<TData> extends TableFilterProps {
  table: Table<TData>;
  hideViewSelector?: boolean;
  placeholder?: string;
}

export function Toolbar<TData>({
  table,
  filters,
  hideViewSelector,
  placeholder,
}: DataTableViewOptionsProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className={styles.Filter}>
      <div className={styles.FilterLeft}>
        <TextField
          name="filter-table"
          label="Filter"
          labelHidden
          placeholder={placeholder}
          prefix={<Icon source={IconSearch} />}
          onChange={(text) => table.setGlobalFilter(text)}
        />
        <div className={styles.FilterItems}>
          {filters?.map((filter) => (
            <DataTableFilter
              key={filter.columnId}
              column={table.getColumn('status')}
              title="Status"
              options={filter.options}
            />
          ))}
          {isFiltered && (
            <Button
              size="slim"
              onClick={() => table.resetColumnFilters()}
              icon={<Icon source={IconX} size={16} color="highlight" />}
              kind="tertiary"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
      <div className={styles.FilterRight}>
        {!hideViewSelector && (
          <div>
            <DataTableView table={table} />
          </div>
        )}
        <div>
          <Menu
            trigger={
              <Button
                icon={
                  <Icon
                    source={IconAdjustmentsHorizontal}
                    color="onBgDefault"
                  />
                }
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

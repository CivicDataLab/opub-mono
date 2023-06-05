'use client';

import { Button } from '../../../Button';
import { Checkbox } from '../../../Checkbox';
import { Icon } from '../../../Icon';
import { Popover } from '../../../Popover';
import { Separator } from '../../../Separator';
import { Text } from '../../../Text';
import styles from '../../DataTable.module.scss';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <>
      <Popover>
        <Popover.Trigger>
          <Button icon={<Icon source={IconAdjustmentsHorizontal} />}>
            View
          </Button>
        </Popover.Trigger>
        <Popover.Content align="end">
          <fieldset>
            <Text as="legend" visuallyHidden>
              Toggle Columns
            </Text>
            <div className={styles.TableView}>
              <div className={styles.TableViewTitle}>
                <Text variant="bodySm" fontWeight="semibold">
                  Toggle Columns
                </Text>
              </div>
              <Separator />
              <div className={styles.TableViewContent}>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanSort())
                  .map((column) => {
                    return (
                      <Checkbox
                        name={column.id}
                        key={column.id}
                        checked={column.getIsVisible()}
                        onChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </Checkbox>
                    );
                  })}
              </div>
            </div>
          </fieldset>
        </Popover.Content>
      </Popover>
    </>
  );
}

'use client';

import { Button } from '../../../Button';
import { Checkbox } from '../../../Checkbox';
import { Divider } from '../../../Divider';
import { Icon } from '../../../Icon';
import { Popover } from '../../../Popover';
import { ScrollArea } from '../../../ScrollArea';
import { Text } from '../../../Text';
import styles from '../../DataTable.module.scss';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableView<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <>
      <Popover>
        <Popover.Trigger>
          <Button
            icon={
              <Icon source={IconAdjustmentsHorizontal} color="onBgDefault" />
            }
          >
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
              <Divider />
              <ScrollArea>
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
              </ScrollArea>
            </div>
          </fieldset>
        </Popover.Content>
      </Popover>
    </>
  );
}

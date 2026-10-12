'use client';

import {
  IconColumns,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react';
import type { Table } from '@tanstack/react-table';

import type {
  ColumnFilterConfig,
  DataTableStatusOption,
  TableFiltersState,
} from '../../../../types/datatable';
import { Button } from '../../../Button';
import { Checkbox } from '../../../Checkbox';
import { Icon } from '../../../Icon';
import { Input } from '../../../Input';
import { Popover } from '../../../Popover';
import { Tab, TabList, Tabs } from '../../../Tabs';
import { Text } from '../../../Text';
import styles from '../../DataTable.module.scss';
import { ManagementFilterButton } from './ManagementFilters';

export { isPopoverFilter } from './ManagementFilters';

function columnHeaderLabel(column: {
  id: string;
  columnDef: { header?: unknown };
}): string {
  const header = column.columnDef.header;
  return typeof header === 'string' ? header : column.id;
}

export function ManagementChrome<TData>({
  title,
  subtitle,
  addLabel,
  onAdd,
  searchValue,
  onSearchChange,
  placeholder,
  filters,
  filtersState,
  onApplyFilters,
  table,
  statuses,
  statusState,
  onStatusChange,
  statusCounts,
}: {
  title?: string;
  subtitle?: string | (() => string);
  addLabel?: string;
  onAdd?: () => void;
  searchValue: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  filters?: ColumnFilterConfig[];
  filtersState: TableFiltersState;
  onApplyFilters: (filters: TableFiltersState) => void;
  table: Table<TData>;
  statuses?: DataTableStatusOption[];
  statusState: string;
  onStatusChange: (status: string) => void;
  statusCounts?: Record<string, number>;
}) {
  const subtitleText = typeof subtitle === 'function' ? subtitle() : subtitle;
  const optionalColumns = table
    .getAllColumns()
    .filter((column) => column.columnDef.meta?.optional);

  return (
    <div className={styles.Management}>
      {(title || subtitleText || addLabel || onAdd) && (
        <div className={styles.ManagementHeader}>
          <div className={styles.ManagementHeading}>
            {title ? (
              <Text as="h2" variant="headingSm" fontWeight="semibold">
                {title}
              </Text>
            ) : null}
            {subtitleText ? (
              <Text as="p" variant="bodyMd" color="subdued">
                {subtitleText}
              </Text>
            ) : null}
          </div>
          {addLabel || onAdd ? (
            <Button
              icon={<IconPlus size={16} stroke={2} />}
              onClick={onAdd}
            >
              {addLabel}
            </Button>
          ) : null}
        </div>
      )}

      <div className={styles.ManagementToolbar}>
        <div className={styles.ManagementSearch}>
          <Input
            name="datatable-search"
            label="Search"
            labelHidden
            placeholder={placeholder || 'Search'}
            value={searchValue}
            prefix={<Icon source={IconSearch} color="subdued" />}
            onChange={(value) => onSearchChange(value)}
            clearButton
            onClearButtonClick={() => onSearchChange('')}
          />
        </div>
        <div className={styles.ManagementToolbarActions}>
          <ManagementFilterButton
            filters={filters}
            filtersState={filtersState}
            onApplyFilters={onApplyFilters}
            table={table}
          />

          <Popover>
            <Popover.Trigger>
              <Button
                kind="neutral"
                icon={<Icon source={IconColumns} color="default" />}
              >
                Columns
              </Button>
            </Popover.Trigger>
            <Popover.Content align="end" className={styles.ManagementPopover}>
              {optionalColumns.length === 0 ? (
                <Text as="p" variant="bodySm" color="subdued">
                  No optional columns
                </Text>
              ) : (
                <div className={styles.ManagementColumns}>
                  {optionalColumns.map((column) => (
                    <Checkbox
                      key={column.id}
                      name={column.id}
                      checked={column.getIsVisible()}
                      onChange={(value) => column.toggleVisibility(Boolean(value))}
                    >
                      {columnHeaderLabel(column)}
                    </Checkbox>
                  ))}
                </div>
              )}
            </Popover.Content>
          </Popover>
        </div>
      </div>

      {statuses?.length ? (
        <div className={styles.ManagementTabs}>
          <Tabs value={statusState} onValueChange={onStatusChange}>
            <TabList neutral>
              <Tab value="all">
                All <span className={styles.TabCount}>{statusCounts?.all ?? 0}</span>
              </Tab>
              {statuses.map((status) => (
                <Tab key={status.key} value={status.key}>
                  {status.label}{' '}
                  <span className={styles.TabCount}>
                    {statusCounts?.[status.key] ?? 0}
                  </span>
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </div>
      ) : null}
    </div>
  );
}

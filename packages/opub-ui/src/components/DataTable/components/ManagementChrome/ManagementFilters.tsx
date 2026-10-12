'use client';

import React from 'react';
import { IconCheck, IconChevronDown, IconFilter, IconFilterFilled } from '@tabler/icons-react';
import type { Table } from '@tanstack/react-table';

import type {
  ColumnFilterConfig,
  ColumnFilterOption,
  ColumnFilterType,
  FilterField,
  TableFiltersState,
} from '../../../../types/datatable';
import { FILTER_CONDITIONS } from '../../../../types/datatable';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { Popover } from '../../../Popover';
import selectStyles from '../../../Select/Select.module.scss';
import { Text } from '../../../Text';
import { cn } from '../../../../utils';
import { normalizeFilterOptions } from '../../filterUtils';
import styles from '../../DataTable.module.scss';
import { ColumnFilterEditor } from '../ColumnFilter/ColumnFilterEditor';

/**
 * Typed filters are edited from the toolbar Filter menu when the management
 * chrome is shown. Header filter buttons stay for tables without that chrome.
 */
export function isPopoverFilter(
  filter: ColumnFilterConfig
): filter is ColumnFilterConfig & { type: ColumnFilterType } {
  return filter.type != null;
}

function columnHeaderLabel(column: {
  id: string;
  columnDef: { header?: unknown };
}): string {
  const header = column.columnDef.header;
  return typeof header === 'string' ? header : column.id;
}

function anyPlaceholder(label: string) {
  const word = label.trim().split(/\s+/).at(-1)?.toLowerCase() ?? 'value';
  return `Any ${word}`;
}

function optionValues(fields: FilterField[]) {
  const values: string[] = [];
  fields.forEach((filter) => {
    filter.value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .forEach((entry) => {
        if (!values.includes(entry)) values.push(entry);
      });
  });
  return values;
}

function selectionSummary(values: string[], options: ColumnFilterOption[]) {
  if (!values.length) return '';
  return values
    .map((value) => options.find((option) => option.value === value)?.label ?? value)
    .join(', ');
}

function isOptionMenuTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest('[data-filter-option-menu]'));
}

export function ManagementFilterButton<TData>({
  filters,
  filtersState,
  onApplyFilters,
  table,
}: {
  filters?: ColumnFilterConfig[];
  filtersState: TableFiltersState;
  onApplyFilters: (filters: TableFiltersState) => void;
  table: Table<TData>;
}) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<Record<string, FilterField[]>>({});
  const popoverFilters = (filters ?? []).filter(isPopoverFilter);
  const menuIds = popoverFilters.map((filter) => filter.columnId);
  const active = menuIds.some((columnId) =>
    filtersState.some((filter) => filter.field === columnId)
  );

  const openMenu = (next: boolean) => {
    if (next) {
      const seeded: Record<string, FilterField[]> = {};
      popoverFilters.forEach((filter) => {
        seeded[filter.columnId] = filtersState.filter(
          (entry) => entry.field === filter.columnId
        );
      });
      setDraft(seeded);
    }
    setOpen(next);
  };

  const commit = (nextDraft: Record<string, FilterField[]>) => {
    const preserved = filtersState.filter(
      (filter) => !menuIds.includes(filter.field)
    );
    const next = menuIds.flatMap((columnId) => nextDraft[columnId] ?? []);
    onApplyFilters([...preserved, ...next]);
  };

  return (
    <Popover open={open} onOpenChange={openMenu}>
      <Popover.Trigger>
        <Button
          kind={active ? 'primary' : 'neutral'}
          icon={
            <Icon
              source={active ? IconFilterFilled : IconFilter}
              color={active ? 'onBgDefault' : 'default'}
            />
          }
        >
          Filter
        </Button>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        className={cn(styles.ManagementPopover, styles.ManagementFilterPopover)}
        onInteractOutside={(event) => {
          if (isOptionMenuTarget(event.target)) event.preventDefault();
        }}
        onFocusOutside={(event) => {
          if (isOptionMenuTarget(event.target)) event.preventDefault();
        }}
      >
        {popoverFilters.length === 0 ? (
          <Text as="p" variant="bodySm" color="subdued">
            No filters
          </Text>
        ) : (
          <div className={styles.ManagementFilters}>
            <div className={styles.ManagementFilterBody}>
            {popoverFilters.map((filter) => {
              const label =
                columnHeaderLabel({
                  id: filter.columnId,
                  columnDef: {
                    header: table.getColumn(filter.columnId)?.columnDef.header,
                  },
                }) || filter.columnId;
              const fields = draft[filter.columnId] ?? [];

              if (filter.type === 'select' || filter.type === 'multiSelect') {
                const multiple = filter.type === 'multiSelect';
                return (
                  <OptionMenuField
                    key={filter.columnId}
                    label={label}
                    multiple={multiple}
                    options={normalizeFilterOptions(filter.options)}
                    values={optionValues(fields)}
                    onChange={(values) => {
                      setDraft((current) => ({
                        ...current,
                        [filter.columnId]: values.length
                          ? [
                              {
                                field: filter.columnId,
                                condition: multiple
                                  ? FILTER_CONDITIONS.in
                                  : FILTER_CONDITIONS.exact,
                                value: multiple ? values.join(',') : values[0],
                              },
                            ]
                          : [],
                      }));
                    }}
                  />
                );
              }

              return (
                <section
                  key={filter.columnId}
                  className={styles.ManagementFilterSection}
                >
                  <Text variant="bodySm" fontWeight="medium">
                    {label}
                  </Text>
                  <ColumnFilterEditor
                    columnId={filter.columnId}
                    type={filter.type}
                    options={normalizeFilterOptions(filter.options)}
                    isRange={Boolean(filter.isRange)}
                    fields={fields}
                    layout="menu"
                    showActions={false}
                    onFilterChange={(next) => {
                      setDraft((current) => ({
                        ...current,
                        [filter.columnId]: next ?? [],
                      }));
                    }}
                    onClear={() => {
                      setDraft((current) => ({
                        ...current,
                        [filter.columnId]: [],
                      }));
                    }}
                  />
                </section>
              );
            })}
            </div>
            <div className={styles.ManagementFilterActions}>
              <Button
                kind="tertiary"
                size="slim"
                onClick={() => {
                  const cleared: Record<string, FilterField[]> = {};
                  menuIds.forEach((columnId) => {
                    cleared[columnId] = [];
                  });
                  setDraft(cleared);
                  commit(cleared);
                  setOpen(false);
                }}
              >
                Clear
              </Button>
              <Button
                size="slim"
                onClick={() => {
                  commit(draft);
                  setOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}

function OptionMenuField({
  label,
  options,
  values,
  multiple,
  onChange,
}: {
  label: string;
  options: ColumnFilterOption[];
  values: string[];
  multiple: boolean;
  onChange: (values: string[]) => void;
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const selected = multiple ? values : values.slice(0, 1);
  const placeholder = anyPlaceholder(label);
  const summary = selectionSummary(selected, options);

  return (
    <div className={styles.ManagementFilterSection}>
      <Text variant="bodySm" fontWeight="medium">
        {label}
      </Text>
      <div className={cn(selectStyles.Select, styles.ManagementSelect)}>
        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger>
            <button type="button" className={selectStyles.Trigger}>
              <Text
                as="span"
                className={selectStyles.SelectedOption}
                color={summary ? undefined : 'subdued'}
              >
                {summary || placeholder}
              </Text>
              <span className={selectStyles.Icon}>
                <Icon source={IconChevronDown} color="default" />
              </span>
            </button>
          </Popover.Trigger>
          <Popover.Content
            data-filter-option-menu=""
            align="start"
            side="bottom"
            sideOffset={4}
            className={styles.ManagementOptionMenu}
            style={{ width: 'var(--radix-popover-trigger-width)' }}
          >
            <div
              className={selectStyles.List}
              role="listbox"
              aria-label={label}
              aria-multiselectable={multiple || undefined}
            >
              {options.map((option) => {
                const checked = selected.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={checked}
                    className={selectStyles.Item}
                    onClick={() => {
                      if (!multiple) {
                        onChange([option.value]);
                        setMenuOpen(false);
                        return;
                      }
                      onChange(
                        checked
                          ? values.filter((value) => value !== option.value)
                          : [...values, option.value]
                      );
                    }}
                  >
                    <span className={selectStyles.ItemLabel}>
                      <Text as="span">{option.label}</Text>
                    </span>
                    <span className={selectStyles.Check}>
                      {checked ? (
                        <Icon source={IconCheck} color="interactive" />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </Popover.Content>
        </Popover>
        <div className={selectStyles.Backdrop} />
      </div>
    </div>
  );
}

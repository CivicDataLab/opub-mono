import React from 'react';

import type {
  ColumnFilterConfig,
  FilterField,
  TableFiltersState,
} from '../../../../types/datatable';
import { FILTER_CONDITIONS } from '../../../../types/datatable';
import { Button } from '../../../Button';
import { Pill } from '../../../Pill';
import styles from '../../DataTable.module.scss';
import {
  findFilterConfig,
  groupFiltersByField,
  normalizeFilterOptions,
} from '../../filterUtils';

type FilterChipGroup = {
  field: string;
  label: string;
  displayValue: string;
};

function optionLabel(
  config: ColumnFilterConfig | undefined,
  value: string
): string {
  const options = normalizeFilterOptions(config?.options);
  const match = options.find((option) => option.value === value);
  return match?.label ?? value;
}

function formatChipGroup(
  field: string,
  fields: FilterField[],
  config?: ColumnFilterConfig,
  columnLabel?: string
): FilterChipGroup {
  const label = columnLabel || config?.columnId || field;
  const gte = fields.find((f) => f.condition === FILTER_CONDITIONS.gte);
  const lte = fields.find((f) => f.condition === FILTER_CONDITIONS.lte);
  const inFilter = fields.find((f) => f.condition === FILTER_CONDITIONS.in);

  let displayValue = '';

  if (gte || lte) {
    displayValue = [gte?.value, lte?.value].filter(Boolean).join(' – ');
  } else if (inFilter) {
    displayValue = inFilter.value
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => optionLabel(config, value))
      .join(', ');
  } else if (fields[0]) {
    displayValue = optionLabel(config, fields[0].value);
  }

  return { field, label, displayValue };
}

function groupFilters(
  filters: TableFiltersState,
  filterConfigs?: ColumnFilterConfig[],
  columnLabels?: Record<string, string>
): FilterChipGroup[] {
  return Array.from(groupFiltersByField(filters).entries()).map(
    ([field, fields]) =>
      formatChipGroup(
        field,
        fields,
        findFilterConfig(filterConfigs, field),
        columnLabels?.[field]
      )
  );
}

type FilterChipsProps = {
  filters: TableFiltersState;
  filterConfigs?: ColumnFilterConfig[];
  columnLabels?: Record<string, string>;
  onRemove: (field: string) => void;
  onClearAll: () => void;
};

export function FilterChips({
  filters,
  filterConfigs,
  columnLabels,
  onRemove,
  onClearAll,
}: FilterChipsProps) {
  const chips = React.useMemo(
    () => groupFilters(filters, filterConfigs, columnLabels),
    [filters, filterConfigs, columnLabels]
  );

  if (!chips.length) return null;

  return (
    <div className={styles.FilterChips}>
      <div className={styles.FilterChipsList}>
        {chips.map((chip) => (
          <Pill
            key={chip.field}
            returnValue={chip.field}
            onRemove={onRemove}
            accessibilityLabel={`Remove ${chip.label} filter`}
            truncate
          >
            {`${chip.label}: ${chip.displayValue}`}
          </Pill>
        ))}
      </div>
      <Button size="slim" kind="tertiary" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  );
}

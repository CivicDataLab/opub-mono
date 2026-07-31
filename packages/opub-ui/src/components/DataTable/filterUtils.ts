import type { ColumnFiltersState, FilterFn } from '@tanstack/react-table';

import type {
  ColumnFilterConfig,
  ColumnFilterOption,
  FilterCondition,
  FilterField,
  TableFiltersState,
} from '../../types/datatable';
import { FILTER_CONDITIONS } from '../../types/datatable';

/** Normalize string[] | {label,value}[] options to a consistent shape. */
export function normalizeFilterOptions(
  options?: ColumnFilterOption[] | string[]
): ColumnFilterOption[] {
  if (!options) return [];
  return options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option
  );
}

/** Group FilterField[] by `field` (preserves order of first occurrence). */
export function groupFiltersByField(
  filters: TableFiltersState
): Map<string, FilterField[]> {
  const byField = new Map<string, FilterField[]>();
  filters.forEach((filter) => {
    const list = byField.get(filter.field) ?? [];
    list.push(filter);
    byField.set(filter.field, list);
  });
  return byField;
}

export function filtersToColumnFilters(
  filters: TableFiltersState
): ColumnFiltersState {
  return Array.from(groupFiltersByField(filters).entries()).map(
    ([id, value]) => ({ id, value })
  );
}

function isFilterFieldArray(value: unknown): value is FilterField[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'object' &&
    value[0] !== null &&
    'field' in (value[0] as object)
  );
}

/**
 * Convert TanStack column-filter values back to FilterField[].
 * Supports FilterField[] (header filters) and string[] (legacy toolbar).
 */
export function columnFiltersToFilterFields(
  columnFilters: ColumnFiltersState
): TableFiltersState {
  return columnFilters.flatMap(({ id, value }) => {
    if (!value) return [];

    if (isFilterFieldArray(value)) {
      return value;
    }

    // Toolbar faceted filter: string[]
    if (Array.isArray(value)) {
      const values = value.map(String).filter(Boolean);
      if (!values.length) return [];
      return [
        {
          field: id,
          condition: FILTER_CONDITIONS.in,
          value: values.join(','),
        },
      ];
    }

    if (typeof value === 'string' && value) {
      return [
        {
          field: id,
          condition: FILTER_CONDITIONS.icontains,
          value,
        },
      ];
    }

    return [];
  });
}

/**
 * Read selected option values from a column filter value, whether it is
 * legacy `string[]` or current `FilterField[]`.
 */
export function getSelectedFilterValues(filterValue: unknown): Set<string> {
  if (!filterValue) return new Set();

  if (isFilterFieldArray(filterValue)) {
    const values = new Set<string>();
    filterValue.forEach((field) => {
      if (field.condition === FILTER_CONDITIONS.in) {
        field.value
          .split(',')
          .map((entry) => entry.trim())
          .filter(Boolean)
          .forEach((entry) => values.add(entry));
      } else if (field.value) {
        values.add(field.value);
      }
    });
    return values;
  }

  if (Array.isArray(filterValue)) {
    return new Set(filterValue.map(String).filter(Boolean));
  }

  if (typeof filterValue === 'string' && filterValue) {
    return new Set([filterValue]);
  }

  return new Set();
}

export function applyCondition(
  cellValue: unknown,
  condition: FilterCondition | string,
  filterValue: string
): boolean {
  const str = String(cellValue ?? '');
  const lower = str.toLowerCase();
  const filterLower = filterValue.toLowerCase();
  const num = Number(cellValue);
  const filterNum = Number(filterValue);

  switch (condition) {
    case FILTER_CONDITIONS.exact:
      return str === filterValue;
    case FILTER_CONDITIONS.iexact:
      return lower === filterLower;
    case FILTER_CONDITIONS.contains:
      return str.includes(filterValue);
    case FILTER_CONDITIONS.icontains:
      return lower.includes(filterLower);
    case FILTER_CONDITIONS.startswith:
      return str.startsWith(filterValue);
    case FILTER_CONDITIONS.endswith:
      return str.endsWith(filterValue);
    case FILTER_CONDITIONS.gt:
      return !Number.isNaN(num) && num > filterNum;
    case FILTER_CONDITIONS.gte:
      return !Number.isNaN(num) && num >= filterNum;
    case FILTER_CONDITIONS.lt:
      return !Number.isNaN(num) && num < filterNum;
    case FILTER_CONDITIONS.lte:
      return !Number.isNaN(num) && num <= filterNum;
    case FILTER_CONDITIONS.in: {
      const set = filterValue
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);
      return set.includes(str);
    }
    default:
      return true;
  }
}

/**
 * Client-side column filter. Accepts FilterField[] (current) or string[]
 * (legacy toolbar values) so older call sites keep working.
 */
export const columnFilterFn: FilterFn<unknown> = (row, id, filterValue) => {
  if (
    Array.isArray(filterValue) &&
    (filterValue.length === 0 || typeof filterValue[0] === 'string')
  ) {
    const selected = filterValue as string[];
    if (!selected.length) return true;
    return selected.includes(String(row.getValue(id) ?? ''));
  }

  const fields = (filterValue as FilterField[] | undefined) ?? [];
  if (!fields.length) return true;
  return fields.every((filter) =>
    applyCondition(row.getValue(id), filter.condition, filter.value)
  );
};

export function findFilterConfig(
  configs: ColumnFilterConfig[] | undefined,
  columnId: string
): ColumnFilterConfig | undefined {
  return configs?.find((config) => config.columnId === columnId);
}

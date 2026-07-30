'use client';

import React from 'react';
import { IconFilter, IconFilterFilled } from '@tabler/icons-react';

import type {
  ColumnFilterConfig,
  ColumnFilterOption,
  ColumnFilterType,
  FilterCondition,
  FilterField,
} from '../../../../types/datatable';
import { FILTER_CONDITIONS } from '../../../../types/datatable';
import { Button } from '../../../Button';
import { Checkbox } from '../../../Checkbox';
import { Popover } from '../../../Popover';
import { RadioGroup, RadioItem } from '../../../RadioGroup';
import { Select } from '../../../Select';
import { Text } from '../../../Text';
import { TextField } from '../../../TextField';
import styles from '../../DataTable.module.scss';
import { normalizeFilterOptions } from '../../filterUtils';

/** Conditions are applied automatically — never shown in the UI */
function resolveCondition(
  type: ColumnFilterType,
  isRange = false
): FilterCondition {
  if (isRange) return FILTER_CONDITIONS.gte;

  switch (type) {
    case 'text':
      return FILTER_CONDITIONS.icontains;
    case 'numeric':
      return FILTER_CONDITIONS.gte;
    case 'date':
      return FILTER_CONDITIONS.exact;
    case 'multiSelect':
      return FILTER_CONDITIONS.in;
    case 'boolean':
    case 'select':
    default:
      return FILTER_CONDITIONS.exact;
  }
}

type FilterButtonProps = {
  config: ColumnFilterConfig;
  fields: FilterField[];
  /** Column header label shown in the popover title */
  label?: React.ReactNode;
  onFilterChange: (columnId: string, fields: FilterField[] | undefined) => void;
};

export const FilterButton = ({
  config,
  fields,
  label,
  onFilterChange,
}: FilterButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const { columnId, type, options, isRange = false } = config;

  const resolvedType: ColumnFilterType =
    type ?? (options?.length ? 'select' : 'text');
  const isActive = fields.length > 0;
  const title = label ?? columnId;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <button
          type="button"
          className={styles.FilterIconButton}
          aria-label={`Filter ${typeof title === 'string' ? title : columnId}`}
          data-active={isActive || undefined}
          onClick={(event) => event.stopPropagation()}
        >
          {/* Use Tabler icons directly so `color` inherits from the button (Icon sets inline color). */}
          {isActive ? (
            <IconFilterFilled size={16} stroke={2} aria-hidden />
          ) : (
            <IconFilter size={16} stroke={2} aria-hidden />
          )}
        </button>
      </Popover.Trigger>
      <Popover.Content align="start" className={styles.ColumnFilterPopover}>
        <div className={styles.ColumnFilterContent}>
          <Text variant="bodySm" fontWeight="medium">
            {title}
          </Text>
          <FilterPopoverBody
            columnId={columnId}
            type={resolvedType}
            options={normalizeFilterOptions(options)}
            isRange={isRange}
            fields={fields}
            onFilterChange={(next) => {
              onFilterChange(columnId, next?.length ? next : undefined);
              if (resolvedType === 'boolean') setOpen(false);
            }}
            onClear={() => {
              onFilterChange(columnId, undefined);
              setOpen(false);
            }}
            onApplied={() => setOpen(false)}
          />
        </div>
      </Popover.Content>
    </Popover>
  );
};

type FilterPopoverBodyProps = {
  columnId: string;
  type: ColumnFilterType;
  options: ColumnFilterOption[];
  isRange: boolean;
  fields: FilterField[];
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied: () => void;
};

const FilterPopoverBody = ({
  columnId,
  type,
  options,
  isRange,
  fields,
  onFilterChange,
  onClear,
  onApplied,
}: FilterPopoverBodyProps) => {
  if (isRange) {
    return (
      <RangeFilter
        columnId={columnId}
        type={type}
        fields={fields}
        onFilterChange={onFilterChange}
        onClear={onClear}
        onApplied={onApplied}
      />
    );
  }

  if (type === 'multiSelect' || type === 'select') {
    return (
      <SelectFilter
        columnId={columnId}
        options={options}
        fields={fields}
        multiSelect={type === 'multiSelect'}
        onFilterChange={onFilterChange}
        onClear={onClear}
        onApplied={onApplied}
      />
    );
  }

  if (type === 'boolean') {
    return (
      <BooleanFilter
        columnId={columnId}
        fields={fields}
        onFilterChange={onFilterChange}
        onClear={onClear}
        onApplied={onApplied}
      />
    );
  }

  return (
    <SingleValueFilter
      columnId={columnId}
      type={type}
      fields={fields}
      onFilterChange={onFilterChange}
      onClear={onClear}
      onApplied={onApplied}
    />
  );
};

const RangeFilter = ({
  columnId,
  type,
  fields,
  onFilterChange,
  onClear,
  onApplied,
}: {
  columnId: string;
  type: ColumnFilterType;
  fields: FilterField[];
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied: () => void;
}) => {
  const isDate = type === 'date';
  const minField = fields.find((f) => f.condition === FILTER_CONDITIONS.gte);
  const maxField = fields.find((f) => f.condition === FILTER_CONDITIONS.lte);

  const [min, setMin] = React.useState(minField?.value ?? '');
  const [max, setMax] = React.useState(maxField?.value ?? '');

  React.useEffect(() => {
    setMin(minField?.value ?? '');
    setMax(maxField?.value ?? '');
  }, [minField?.value, maxField?.value]);

  return (
    <>
      <div className={styles.ColumnFilterRange}>
        <TextField
          name={`${columnId}-min`}
          label={isDate ? 'From' : 'Minimum'}
          type={isDate ? 'date' : 'number'}
          placeholder={isDate ? 'From date' : 'Min'}
          value={min}
          onChange={setMin}
        />
        <span className={styles.ColumnFilterRangeDivider} aria-hidden>
          to
        </span>
        <TextField
          name={`${columnId}-max`}
          label={isDate ? 'To' : 'Maximum'}
          type={isDate ? 'date' : 'number'}
          placeholder={isDate ? 'To date' : 'Max'}
          value={max}
          onChange={setMax}
        />
      </div>
      <FilterActions
        onClear={onClear}
        canClear={fields.length > 0}
        onApply={() => {
          const next: FilterField[] = [];
          if (min.trim()) {
            next.push({
              field: columnId,
              condition: FILTER_CONDITIONS.gte,
              value: min.trim(),
            });
          }
          if (max.trim()) {
            next.push({
              field: columnId,
              condition: FILTER_CONDITIONS.lte,
              value: max.trim(),
            });
          }
          onFilterChange(next.length ? next : undefined);
          onApplied();
        }}
      />
    </>
  );
};

const SingleValueFilter = ({
  columnId,
  type,
  fields,
  onFilterChange,
  onClear,
  onApplied,
}: {
  columnId: string;
  type: ColumnFilterType;
  fields: FilterField[];
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied: () => void;
}) => {
  const condition = resolveCondition(type);
  const [value, setValue] = React.useState(fields[0]?.value ?? '');

  React.useEffect(() => {
    setValue(fields[0]?.value ?? '');
  }, [fields]);

  return (
    <>
      <TextField
        name={`${columnId}-value`}
        label="Value"
        labelHidden
        type={type === 'numeric' ? 'number' : type === 'date' ? 'date' : 'text'}
        placeholder={
          type === 'text'
            ? 'Contains…'
            : type === 'numeric'
              ? 'Greater than or equal…'
              : 'Value…'
        }
        value={value}
        onChange={setValue}
      />
      <FilterActions
        onClear={onClear}
        canClear={fields.length > 0}
        onApply={() => {
          if (!value.trim()) {
            onFilterChange(undefined);
          } else {
            onFilterChange([
              {
                field: columnId,
                condition,
                value: value.trim(),
              },
            ]);
          }
          onApplied();
        }}
      />
    </>
  );
};

const BooleanFilter = ({
  columnId,
  fields,
  onFilterChange,
  onClear,
  onApplied,
}: {
  columnId: string;
  fields: FilterField[];
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied: () => void;
}) => {
  const [draft, setDraft] = React.useState(fields[0]?.value ?? '');

  React.useEffect(() => {
    setDraft(fields[0]?.value ?? '');
  }, [fields]);

  return (
    <>
      <Select
        label="Value"
        labelHidden
        placeholder="Select…"
        options={[
          { label: 'True', value: 'true' },
          { label: 'False', value: 'false' },
        ]}
        value={draft}
        onChange={setDraft}
      />
      <FilterActions
        onClear={() => {
          setDraft('');
          onClear();
        }}
        canClear={Boolean(fields[0]?.value || draft)}
        onApply={() => {
          if (!draft) {
            onFilterChange(undefined);
          } else {
            onFilterChange([
              {
                field: columnId,
                condition: FILTER_CONDITIONS.exact,
                value: draft,
              },
            ]);
          }
          onApplied();
        }}
      />
    </>
  );
};

const SelectFilter = ({
  columnId,
  options,
  fields,
  multiSelect,
  onFilterChange,
  onClear,
  onApplied,
}: {
  columnId: string;
  options: ColumnFilterOption[];
  fields: FilterField[];
  multiSelect: boolean;
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied: () => void;
}) => {
  const appliedValues = React.useMemo(
    () =>
      (fields[0]?.value ?? '')
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean),
    [fields]
  );

  const [draft, setDraft] = React.useState<string[]>(appliedValues);

  React.useEffect(() => {
    setDraft(appliedValues);
  }, [appliedValues]);

  return (
    <>
      <div className={styles.ColumnFilterOptions}>
        {multiSelect ? (
          options.map((option) => {
            const checked = draft.includes(option.value);
            return (
              <Checkbox
                key={option.value}
                name={option.value}
                checked={checked}
                onChange={() => {
                  setDraft((prev) => {
                    if (prev.includes(option.value)) {
                      return prev.filter((value) => value !== option.value);
                    }
                    return [...prev, option.value];
                  });
                }}
              >
                {option.label}
              </Checkbox>
            );
          })
        ) : (
          <RadioGroup
            name={`${columnId}-select-filter`}
            value={draft[0] ?? ''}
            onChange={(value) => setDraft(value ? [value] : [])}
          >
            {options.map((option) => (
              <RadioItem key={option.value} value={option.value}>
                {option.label}
              </RadioItem>
            ))}
          </RadioGroup>
        )}
      </div>
      <FilterActions
        onClear={() => {
          setDraft([]);
          onClear();
        }}
        canClear={appliedValues.length > 0 || draft.length > 0}
        onApply={() => {
          if (!draft.length) {
            onFilterChange(undefined);
          } else if (multiSelect) {
            onFilterChange([
              {
                field: columnId,
                condition: FILTER_CONDITIONS.in,
                value: draft.join(','),
              },
            ]);
          } else {
            onFilterChange([
              {
                field: columnId,
                condition: FILTER_CONDITIONS.exact,
                value: draft[0],
              },
            ]);
          }
          onApplied();
        }}
      />
    </>
  );
};

const FilterActions = ({
  onClear,
  onApply,
  canClear,
}: {
  onClear: () => void;
  onApply?: () => void;
  canClear: boolean;
}) => (
  <div className={styles.ColumnFilterActions}>
    <Button size="slim" kind="tertiary" disabled={!canClear} onClick={onClear}>
      Clear
    </Button>
    {onApply && (
      <Button size="slim" onClick={onApply}>
        Apply
      </Button>
    )}
  </div>
);

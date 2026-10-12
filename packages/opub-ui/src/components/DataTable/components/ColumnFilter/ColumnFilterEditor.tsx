'use client';

import React from 'react';

import type {
  ColumnFilterOption,
  ColumnFilterType,
  FilterCondition,
  FilterField,
} from '../../../../types/datatable';
import { FILTER_CONDITIONS } from '../../../../types/datatable';
import { Button } from '../../../Button';
import { Checkbox } from '../../../Checkbox';
import { RadioGroup, RadioItem } from '../../../RadioGroup';
import { Select } from '../../../Select';
import { TextField } from '../../../TextField';
import styles from '../../DataTable.module.scss';

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

export type ColumnFilterLayout = 'header' | 'menu';

type ColumnFilterEditorProps = {
  columnId: string;
  type: ColumnFilterType;
  options: ColumnFilterOption[];
  isRange: boolean;
  fields: FilterField[];
  /**
   * `header` is the column filter popover.
   * `menu` is the toolbar Filter menu: same conditions, options listed in the panel.
   */
  layout?: ColumnFilterLayout;
  /** Header popovers commit with their own buttons. The toolbar menu uses one Apply. */
  showActions?: boolean;
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied?: () => void;
};

export const ColumnFilterEditor = ({
  columnId,
  type,
  options,
  isRange,
  fields,
  layout = 'header',
  showActions = true,
  onFilterChange,
  onClear,
  onApplied,
}: ColumnFilterEditorProps) => {
  if (isRange) {
    return (
      <RangeFilter
        columnId={columnId}
        type={type}
        fields={fields}
        layout={layout}
        showActions={showActions}
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
        showActions={showActions}
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
        layout={layout}
        showActions={showActions}
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
      showActions={showActions}
      onFilterChange={onFilterChange}
      onClear={onClear}
      onApplied={onApplied}
    />
  );
};

function useDraftEmit(
  showActions: boolean,
  value: string,
  emit: () => void
) {
  const emitRef = React.useRef(emit);
  emitRef.current = emit;

  React.useEffect(() => {
    if (showActions) return;
    emitRef.current();
  }, [showActions, value]);
}

const RangeFilter = ({
  columnId,
  type,
  fields,
  layout,
  showActions,
  onFilterChange,
  onClear,
  onApplied,
}: {
  columnId: string;
  type: ColumnFilterType;
  fields: FilterField[];
  layout: ColumnFilterLayout;
  showActions: boolean;
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied?: () => void;
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

  const apply = () => {
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
    onApplied?.();
  };

  useDraftEmit(showActions, `${min}\n${max}`, apply);

  return (
    <>
      {layout === 'menu' ? (
        <div
          className={styles.ManagementRange}
          data-kind={isDate ? 'date' : 'number'}
        >
          <TextField
            name={`${columnId}-min`}
            label={isDate ? 'From' : 'Minimum'}
            type={isDate ? 'date' : 'number'}
            placeholder={isDate ? undefined : 'Min'}
            value={min}
            onChange={setMin}
          />
          <span className={styles.ManagementRangeBridge} aria-hidden>
            <span className={styles.ManagementRangeBridgeLine} />
            <span className={styles.ManagementRangeBridgeLabel}>to</span>
            <span className={styles.ManagementRangeBridgeLine} />
          </span>
          <TextField
            name={`${columnId}-max`}
            label={isDate ? 'To' : 'Maximum'}
            type={isDate ? 'date' : 'number'}
            placeholder={isDate ? undefined : 'Max'}
            value={max}
            onChange={setMax}
          />
        </div>
      ) : (
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
      )}
      {showActions ? (
        <FilterActions
          onClear={onClear}
          canClear={fields.length > 0}
          onApply={apply}
        />
      ) : null}
    </>
  );
};

const SingleValueFilter = ({
  columnId,
  type,
  fields,
  showActions,
  onFilterChange,
  onClear,
  onApplied,
}: {
  columnId: string;
  type: ColumnFilterType;
  fields: FilterField[];
  showActions: boolean;
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied?: () => void;
}) => {
  const condition = resolveCondition(type);
  const [value, setValue] = React.useState(fields[0]?.value ?? '');

  React.useEffect(() => {
    setValue(fields[0]?.value ?? '');
  }, [fields]);

  const apply = () => {
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
    onApplied?.();
  };

  useDraftEmit(showActions, value, apply);

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
      {showActions ? (
        <FilterActions
          onClear={onClear}
          canClear={fields.length > 0}
          onApply={apply}
        />
      ) : null}
    </>
  );
};

const BooleanFilter = ({
  columnId,
  fields,
  layout,
  showActions,
  onFilterChange,
  onClear,
  onApplied,
}: {
  columnId: string;
  fields: FilterField[];
  layout: ColumnFilterLayout;
  showActions: boolean;
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied?: () => void;
}) => {
  const [draft, setDraft] = React.useState(fields[0]?.value ?? '');

  React.useEffect(() => {
    setDraft(fields[0]?.value ?? '');
  }, [fields]);

  const apply = () => {
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
    onApplied?.();
  };

  useDraftEmit(showActions, draft, apply);

  return (
    <>
      {layout === 'menu' ? (
        <RadioGroup
          name={`${columnId}-boolean`}
          title="Value"
          titleHidden
          value={draft}
          onChange={setDraft}
        >
          <RadioItem value="true">True</RadioItem>
          <RadioItem value="false">False</RadioItem>
        </RadioGroup>
      ) : (
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
      )}
      {showActions ? (
        <FilterActions
          onClear={() => {
            setDraft('');
            onClear();
          }}
          canClear={Boolean(fields[0]?.value || draft)}
          onApply={apply}
        />
      ) : null}
    </>
  );
};

const SelectFilter = ({
  columnId,
  options,
  fields,
  multiSelect,
  showActions,
  onFilterChange,
  onClear,
  onApplied,
}: {
  columnId: string;
  options: ColumnFilterOption[];
  fields: FilterField[];
  multiSelect: boolean;
  showActions: boolean;
  onFilterChange: (fields: FilterField[] | undefined) => void;
  onClear: () => void;
  onApplied?: () => void;
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
        {options.length === 0 ? null : multiSelect ? (
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
            title="Value"
            titleHidden
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
      {showActions ? (
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
            onApplied?.();
          }}
        />
      ) : null}
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

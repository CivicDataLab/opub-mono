'use client';

import React from 'react';
import { IconFilter, IconFilterFilled } from '@tabler/icons-react';

import type {
  ColumnFilterConfig,
  ColumnFilterType,
  FilterField,
} from '../../../../types/datatable';
import { Popover } from '../../../Popover';
import { Text } from '../../../Text';
import styles from '../../DataTable.module.scss';
import { normalizeFilterOptions } from '../../filterUtils';
import { ColumnFilterEditor } from '../ColumnFilter/ColumnFilterEditor';

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
          <ColumnFilterEditor
            columnId={columnId}
            type={resolvedType}
            options={normalizeFilterOptions(options)}
            isRange={isRange}
            fields={fields}
            layout="header"
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

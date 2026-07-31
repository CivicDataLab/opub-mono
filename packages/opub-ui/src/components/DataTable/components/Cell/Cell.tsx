import React from 'react';
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconArrowsSort,
} from '@tabler/icons-react';

import type {
  ColumnFilterConfig,
  FilterField,
  SortDirection,
} from '../../../../types/datatable';
import { cn } from '../../../../utils';
import { Icon } from '../../../Icon';
import { Text } from '../../../Text';
import { Tooltip } from '../../../Tooltip';
import styles from '../../DataTable.module.scss';
import { FilterButton } from './FilterButton';

function SortButton({
  column,
  sortable,
  text,
  columnType,
  defaultSortDirection,
}: {
  column: any;
  sortable: boolean;
  text: React.ReactNode;
  columnType?: string;
  defaultSortDirection: SortDirection;
}) {
  const headerClassName = cn(
    styles.Heading,
    columnType && columnType === 'text' && styles['Heading-left']
  );

  const iconClassName = cn(sortable && styles.Icon);
  const sortDirection = column.getIsSorted() as string;
  const direction = sortDirection ? sortDirection : defaultSortDirection;
  let source = IconArrowsSort;
  if (sortDirection)
    source = direction === 'desc' ? IconArrowNarrowDown : IconArrowNarrowUp;

  const a11ylabel = `Sorted in ${
    direction === 'desc' ? 'descending' : 'ascending'
  } order`;

  const iconMarkup = (
    <span className={iconClassName}>
      <Icon
        source={source}
        color={sortDirection ? 'default' : 'disabled'}
        size={18}
        accessibilityLabel={a11ylabel}
      />
    </span>
  );

  return column.getCanSort() && sortable ? (
    <button
      className={headerClassName}
      onClick={column.getToggleSortingHandler()}
    >
      {iconMarkup}
      <Text variant="bodySm" color="subdued" fontWeight="medium">
        {text}
      </Text>
    </button>
  ) : null;
}

type HeaderProps = {
  header: any;
  sortable: boolean;
  className: string;
  text: React.ReactNode;
  columnType?: string;
  defaultSortDirection: SortDirection;
  filter?: ColumnFilterConfig;
  filterFields?: FilterField[];
  onFilterChange?: (
    columnId: string,
    fields: FilterField[] | undefined
  ) => void;
};

export const HeaderCell = ({
  header,
  sortable,
  className,
  text,
  columnType,
  defaultSortDirection,
  filter,
  filterFields = [],
  onFilterChange,
  ...rest
}: HeaderProps) => {
  const heading =
    !header.isPlaceholder && header.column.getCanSort() && sortable ? (
      <SortButton
        columnType={columnType}
        text={text}
        column={header.column}
        sortable={sortable}
        defaultSortDirection={defaultSortDirection}
      />
    ) : (
      <Text variant="bodySm" color="subdued" fontWeight="medium">
        {text}
      </Text>
    );

  return (
    <th className={className} {...rest}>
      <div className={styles.HeaderCellContent}>
        {header.isPlaceholder ? null : heading}
        {filter && onFilterChange && (
          <FilterButton
            config={filter}
            fields={filterFields}
            label={text}
            onFilterChange={onFilterChange}
          />
        )}
      </div>
    </th>
  );
};

type CellProps = {
  cell: any;
  className: string;
  text: React.ReactNode;
  truncate: boolean;
  index: number;
};

export const Cell = ({
  className,
  text,
  cell,
  truncate,
  index,
  ...rest
}: CellProps) => {
  return (
    <td className={className} key={cell.id} {...rest}>
      {truncate ? (
        <TruncatedText className={styles.TooltipContent}>{text}</TruncatedText>
      ) : (
        text
      )}
    </td>
  );
};

const TruncatedText = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const textRef = React.useRef<any | null>(null);
  const { current } = textRef;
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    forceUpdate();
  }, [children]);

  const text = (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );

  return current?.scrollWidth > current?.offsetWidth ? (
    <Tooltip.Provider>
      <Tooltip delayDuration={0} content={textRef.current.innerText}>
        <Text variant="bodyMd">{text}</Text>
      </Tooltip>
    </Tooltip.Provider>
  ) : (
    text
  );
};

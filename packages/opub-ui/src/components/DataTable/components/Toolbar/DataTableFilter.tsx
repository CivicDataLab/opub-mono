import { IconCirclePlus } from '@tabler/icons-react';
import { Column } from '@tanstack/react-table';

import { Badge } from '../../../Badge';
import { Button } from '../../../Button';
import { Checkbox } from '../../../Checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../Command';
import { Divider } from '../../../Divider';
import { Icon } from '../../../Icon';
import { Popover } from '../../../Popover';
import { ScrollArea } from '../../../ScrollArea';
import { Text } from '../../../Text';
import styles from '../../DataTable.module.scss';

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: any;
  }[];
}

export function DataTableFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button icon={<Icon source={IconCirclePlus} color="onBgDefault" />}>
          <div className="flex items-center">
            {title}
            {selectedValues?.size > 0 && (
              <>
                <Divider
                  orientation="vertical"
                  className={styles.FilterSeparator}
                />

                <div className={styles.FilterItemsBadges}>
                  {selectedValues.size > 2 ? (
                    <Badge>
                      <>{String(selectedValues.size)} selected</>
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge key={option.value}>{option.label}</Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </div>
        </Button>
      </Popover.Trigger>
      <Popover.Content align="start">
        <Command className={styles.FilterPopover}>
          <CommandInput
            className={styles.FilterItemInput}
            placeholder={title}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                <div className={styles.FilterContentWrapper}>
                  {options.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          if (isSelected) {
                            selectedValues.delete(option.value);
                          } else {
                            selectedValues.add(option.value);
                          }
                          const filterValues = Array.from(selectedValues);
                          column?.setFilterValue(
                            filterValues.length ? filterValues : undefined
                          );
                        }}
                      >
                        <Checkbox
                          name={option.label}
                          checked={isSelected}
                          labelHidden
                        >
                          {option.label}
                        </Checkbox>

                        <div className="flex w-full items-center justify-between">
                          <span className={styles.FilterItemLabel}>
                            {option.icon && <Icon source={option.icon} />}
                            <Text>{option.label}</Text>
                          </span>
                          {facets?.get(option.value) && (
                            <span className="text-xs ml-auto flex h-4 w-4 items-center justify-center font-mono">
                              <Text>{facets.get(option.value)}</Text>
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    );
                  })}
                </div>
              </ScrollArea>
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <Divider />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className={styles.FilterCMDClear}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </Popover.Content>
    </Popover>
  );
}

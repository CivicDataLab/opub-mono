import { Badge } from '../../../Badge';
import { Box } from '../../../Box';
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
import { Icon } from '../../../Icon';
import { Popover } from '../../../Popover';
import { ScrollArea } from '../../../ScrollArea';
import { Separator } from '../../../Separator';
import { Text } from '../../../Text';
import styles from '../../DataTable.module.scss';
import { IconCirclePlus } from '@tabler/icons-react';
import { Column } from '@tanstack/react-table';

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
        <Button icon={<Icon source={IconCirclePlus} />}>
          <Box flex alignItems="center">
            {title}
            {selectedValues?.size > 0 && (
              <>
                <Separator
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
          </Box>
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

                        <Box
                          flex
                          alignItems="center"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <span className={styles.FilterItemLabel}>
                            {option.icon && <Icon source={option.icon} />}
                            <Text>{option.label}</Text>
                          </span>
                          {facets?.get(option.value) && (
                            <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                              <Text>{facets.get(option.value)}</Text>
                            </span>
                          )}
                        </Box>
                      </CommandItem>
                    );
                  })}
                </div>
              </ScrollArea>
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <Separator />
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

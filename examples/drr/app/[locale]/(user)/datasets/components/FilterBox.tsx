'use client';

import { FilterProps } from '@/types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Checkbox, Icon, Text } from 'opub-ui';

import { Icons } from '@/components/icons';
import styles from './Filter.module.scss';

export const FilterBox = ({ filters }: { filters: FilterProps[] }) => (
  <div className="flex flex-col gap-4">
    {filters.map((item, index) => (
      <div key={index}>
        {Object.entries(item).map(([key, value]) => (
          <Collapsible
            defaultOpen
            className="border-borderSubdued border-1 border-solid rounded-1"
          >
            <div className="max-w-full min-w-max bg-surfaceNeutral rounded-1 border-t-0 border-1 border-solid border-borderSubdued">
              <CollapsibleTrigger className={styles.CollapseTrigger}>
                <Text key={key} variant="headingMd" as="h3">
                  {key}
                </Text>
                <Icon source={Icons.down} />
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="pb-4 px-2 max-w-full min-w-max">
              <div className="mt-4 flex flex-col gap-3">
                {value.map((itemValue, itemIndex) => (
                  <Checkbox key={itemIndex} name={itemValue} onChange={() => {}}>
                    {itemValue}
                  </Checkbox>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    ))}
  </div>
);

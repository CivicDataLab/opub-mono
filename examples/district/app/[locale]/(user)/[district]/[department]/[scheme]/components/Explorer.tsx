import Image from 'next/image';
import {
  ComboboxMulti,
  Icon,
  Input,
  RadioGroup,
  RadioItem,
  ScrollArea,
  Select,
  Separator,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from 'opub-ui';

import Icons from '@/components/icons';
import { explorer } from '../scheme.config';

export const Explorer = () => {
  return (
    <div className="flex gap-4">
      <Indicators />
      <Content />
    </div>
  );
};

const Indicators = () => {
  return (
    <div className="basis-[244px] flex flex-col gap-4">
      <Text variant="headingLg">Indicators</Text>
      <Input
        name="indicator-search"
        label="Indicator Search"
        labelHidden
        prefix={<Icon source={Icons.search} />}
        placeholder="Search"
      />
      <div>
        <RadioGroup
          onChange={(val, name) => {
            console.log(val, name);
          }}
          name="radio1"
          defaultValue={explorer.indicators[0].list[0].slug}
        >
          <ScrollArea>
            <div className="flex flex-col gap-8 max-h-[676px]">
              {explorer.indicators.map((item) => {
                return (
                  <section key={item.title}>
                    <div className="mb-3">
                      <Text variant="headingSm">{item.title}</Text>
                      <Separator className="mt-3" />
                    </div>
                    {item.list.map((child) => {
                      return (
                        <RadioItem key={child.label} value={child.slug}>
                          {child.label}
                        </RadioItem>
                      );
                    })}
                  </section>
                );
              })}
            </div>
          </ScrollArea>
        </RadioGroup>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className="grow h-full">
      <Tabs defaultValue={explorer.tabs[0].value}>
        <TabList>
          {explorer.tabs.map((tab) => (
            <Tab value={tab.value} key={tab.value}>
              <div className="flex items-center gap-3">
                <Text variant="bodyMd" fontWeight="medium">
                  {tab.label}
                </Text>
              </div>
            </Tab>
          ))}
        </TabList>
        <div className="rounded-05 bg-background h-full p-4 md:p-6">
          <div className="flex gap-4 flex-wrap">
            <Select
              name="sort"
              label="Sort By"
              labelHidden
              options={[
                { label: 'Ascending Order', value: 'asc' },
                { label: 'Descending Order', value: 'desc' },
              ]}
              className="w-1/3 grow"
            />
            <Select
              name="year"
              label="Year"
              labelHidden
              options={[
                { label: '2019', value: '2019' },
                { label: '2020', value: '2020' },
              ]}
              className="w-1/3 grow"
            />
            <ComboboxMulti
              name="block"
              label="Block"
              labelHidden
              defaultList={['Block 1', 'Block 2', 'Block 3', 'Block 4']}
              defaultValues={['Block 1']}
              className="w-full"
              placeholder='Select "Block"'
              verticalContent
            />
          </div>

          {explorer.tabs.map((tab) => (
            <TabPanel value={tab.value} key={tab.value}>
              <div className="relative h-full min-h-[556px] mt-5">
                <Image src="/logo/chartPlaceholder.png" alt="" layout="fill" />
              </div>
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

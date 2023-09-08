'use client';

import React from 'react';
import Link from 'next/link';
import { usePRouter } from '@/hooks/use-prouter';
import { Icon, Input, Separator, Text } from 'opub-ui';
import { MapChart } from 'opub-viz';

import { useFetch } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { assamDistricts } from './home.config';

export default function Home() {
  const [search, setSearch] = React.useState('');
  const [districtList, setDistrictList] = React.useState(assamDistricts);
  const router = usePRouter();
  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `assam-mapFile`,
    `/files/assam.json`
  );

  // filter districtList based on search
  React.useEffect(() => {
    if (search) {
      const filteredDistricts = assamDistricts.filter((district) =>
        district.name.toLowerCase().includes(search.toLowerCase())
      );
      setDistrictList(filteredDistricts);
    } else {
      setDistrictList(assamDistricts);
    }
  }, [search]);

  return (
    <main className="px-2">
      <div className="mx-auto mt-10 py-6 px-10 bg-surface rounded-1 shadow-lg max-w-[1180px]">
        <Text variant="heading2xl" as="h1">
          Data for Districts Assam
        </Text>
        <Separator className="my-6" />
        <div className="max-w-[795px]">
          <Text variant="bodyLg">
            It is the most populated state in India, as well as the most
            populous country subdivision in the world. The state is bordered by
            Rajasthan to the west, Haryana, Himachal Pradesh and Delhi to the
            northwest, Uttarakhand and an international border with Nepal to the
            north, Bihar to the east, Madhya Pradesh to the south, and touches
            the states of Jharkhand and Chhattisgarh to the southeast.
          </Text>
        </div>
        <div className="mt-10 flex gap-10">
          <div className="w-full max-w-[768px] bg-surfaceHighlightSubdued">
            <MapChart
              mapFile={mapFile}
              mapName="assam-block"
              height="450px"
              loading={mapLoading}
              nameProperty="district"
              visualMap={{
                show: false,
              }}
              tileBackgroundColor="#e3dfdf"
              tileSelectedBgColor="#e3dfdf"
              tileHoveredBgColor="#f2eded"
              tileBorderColor="#8C9196"
              data={[
                { name: 'Morigaon', value: 0 },
                { name: 'Nagaon', value: 0 },
              ]}
              formatter={function (params: any) {
                if (params.data) {
                  const { name } = params.data;
                  return name;
                }
              }}
              onNewSelected={(selected: any) => {
                if (selected) {
                  router.push(`/${selected.name.toLowerCase()}`);
                }
              }}
            />
          </div>
          <div className="rounded-1 border-1 border-divider border-solid grow p-4">
            <Input
              name="district-search"
              placeholder="Search"
              label="Search District"
              labelHidden
              prefix={<Icon source={Icons.search} />}
              onChange={setSearch}
              value={search}
            />
            <div className="mt-4 overflow-y-scroll max-h-[360px]">
              {districtList.map((district) => (
                <Link
                  key={district.slug}
                  href={!district.enabled ? '#' : `/${district.slug}`}
                  className={cn(
                    'flex items-center gap-2 p-2 cursor-pointer text-interactive hover:text-interactiveHovered hover:underline',
                    !district.enabled &&
                      'opacity-50 cursor-not-allowed pointer-events-none'
                  )}
                  aria-disabled={!district.enabled}
                >
                  <Text variant="bodyLg" fontWeight="medium" color="inherit">
                    {district.name}
                  </Text>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

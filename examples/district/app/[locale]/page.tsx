'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePRouter } from '@/hooks/use-prouter';
import { Icon, Input, Separator, Text } from 'opub-ui';

import { useFetch } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { assamDistricts } from './home.config';

const LeafletChoropleth = dynamic(
  () => import('opub-viz').then((mod) => mod.LeafletChoropleth),
  { ssr: false }
);

export default function Home() {
  const [search, setSearch] = React.useState('');
  const [districtList, setDistrictList] = React.useState(assamDistricts);
  const router = usePRouter();
  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `assam-mapFiles`,
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
    <main className="">
      <div className="py-12 w-full bg-backgroundDark">
        <div className="flex items-center justify-center gap-10">
          <div className="w-[100px] h-[100px] bg-lightmodeVioletSolid5 rounded-full" />
          <div className=" text-textOnBG">
            <Text
              variant="heading4xl"
              as="h1"
              className="flex items-center gap-6 uppercase"
              color="inherit"
            >
              <span>অসম</span>
              <span>Assam</span>
            </Text>
            <Text
              variant="heading2xl"
              className="mt-2 uppercase"
              color="inherit"
              fontWeight="regular"
            >
              District Dashboard
            </Text>
          </div>
        </div>
      </div>
      <div className="mx-auto px-2">
        {/* <Text variant="heading2xl" as="h1">
          Data for Districts Assam
        </Text> */}
        <div className="mt-10 flex gap-10">
          <div className="w-full max-w-[768px] h-[520px] bg-surfaceHighlightSubdued">
            {!mapLoading && (
              <LeafletChoropleth
                features={mapFile.features}
                // legendData={legendData}
                // mapDataFn={mapDataFn}
                // mapProperty={'dt_code'}
                mapZoom={7.4}
                zoomOnClick={false}
                click={(e) => {
                  const features = e.feature.properties;
                  if (features.district)
                    router.push(`/${features.district.toLowerCase()}`);
                }}
                hideLayers
              />
            )}
            {/* <MapChart
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
            /> */}
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

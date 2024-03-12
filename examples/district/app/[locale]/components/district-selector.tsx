import React from 'react';
import Link from 'next/link';
import { usePRouter } from '@/hooks/use-prouter';
import { Divider, Icon, SearchInput, Text } from 'opub-ui';

import { useFetch } from '@/lib/api';
import { cn } from '@/lib/utils';
import Icons from '@/components/icons';
import MapChart from '@/components/MapChart';
import {
  assamDistrictCategory,
  availableDistricts,
  filterDistricts,
} from '../home.config';

export const DistrictSelector = () => {
  const [search, setSearch] = React.useState('');
  const [districtList, setDistrictList] = React.useState(assamDistrictCategory);
  const router = usePRouter();
  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `assam-mapFiles`,
    `/files/assam.json`
  );

  // using ref since state will cause re-render
  const districtNameRef = React.useRef<HTMLDivElement>(null);
  function handleMouseOver(e: any) {
    if (districtNameRef.current) {
      districtNameRef.current.innerHTML = e.feature.properties.district;
    }
  }

  function handleMouseOut() {
    if (districtNameRef.current) {
      districtNameRef.current.innerHTML = 'District';
    }
  }

  // filter districtList based on search
  React.useEffect(() => {
    if (search) {
      const filteredDistricts = filterDistricts(search.toLowerCase());
      setDistrictList(filteredDistricts);
    } else {
      setDistrictList(assamDistrictCategory);
    }
  }, [search]);

  const mapDataFn = (
    value: boolean,
    type: 'default' | 'hover' | 'selected' = 'default'
  ) => {
    return value
      ? `var(--mapareadistrict-${type})`
      : 'var(--mapareadistrict-disabled)';
  };

  return (
    <div className="mx-auto mt-10 hidden max-h-[682px] gap-4 md:flex">
      <div className="relative w-full max-w-[1016px] rounded-05 bg-surfaceDefault p-6 shadow-basicMd">
        {!mapLoading && (
          <MapChart
            features={mapFile.features}
            mapZoom={7.4}
            zoomOnClick={false}
            mapProperty="enabled"
            mapDataFn={mapDataFn}
            click={(e: any) => {
              const features = e.feature.properties;
              if (
                features.district &&
                availableDistricts.find(
                  (e) => e.slug === features.district.toLowerCase()
                )
              )
                router.push(`/${features.district.toLowerCase()}`);
            }}
            hideLayers
            fillOpacity={1}
            mouseover={handleMouseOver}
            mouseout={handleMouseOut}
          />
        )}
        <div
          ref={districtNameRef}
          className="absolute right-8 top-8 z-max h-[40px] rounded-1 border-1 border-solid border-borderDefault bg-surfaceDefault px-4 py-2"
        >
          District
        </div>
      </div>
      <div className="min-w-[328px] grow overflow-y-scroll rounded-05 bg-surfaceDefault p-4 shadow-basicMd">
        <Text variant="headingLg" fontWeight="semibold">
          Districts
        </Text>
        <Text
          variant="bodyMd"
          fontWeight="regular"
          color="subdued"
          className="mt-2 block"
        >
          Select district to view insights
        </Text>
        <Divider className="my-4" />
        <div className="flex flex-col gap-3">
          {availableDistricts.map((district) => (
            <Link
              key={district.slug}
              href={district.slug}
              className={cn(
                'flex cursor-pointer items-center gap-2 text-textInteractive hover:underline'
              )}
            >
              <Icon source={Icons.diamond} color="highlight" />
              <Text variant="bodyLg" fontWeight="medium" color="inherit">
                {district.name}
              </Text>
            </Link>
          ))}
        </div>
        <Divider className="my-4" />
        <SearchInput
          name="district-search"
          label="Search Search"
          onChange={setSearch}
        />

        <div className="mt-8 flex flex-col gap-4">
          {Object.values(districtList).map((category) => (
            <div key={category.name}>
              <div className="flex items-center justify-between gap-1">
                <Text variant="headingSm" fontWeight="medium" color="subdued">
                  {category.name}
                </Text>
              </div>
              <Divider className="mb-3 mt-2" />
              <div className="flex flex-col gap-3">
                {category.districts.map((district) => (
                  <Text
                    key={district}
                    variant="bodyLg"
                    fontWeight="medium"
                    color="disabled"
                  >
                    {district}
                  </Text>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

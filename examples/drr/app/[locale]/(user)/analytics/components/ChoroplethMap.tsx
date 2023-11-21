'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { useFetch } from '@/lib/api';

const LeafletChoropleth = dynamic(
  () => import('opub-viz/src').then((mod) => mod.LeafletChoropleth),
  { ssr: false }
);

export function MapComponent({ boundary }: { boundary: string }) {

  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `assam-mapFile`,
    `/files/assam.json`
  );

  const { data: revenueMapFile, isLoading: revenueMapLoading } = useFetch(
    `assam-RevenueMapFile`,
    `/files/assam_block.json`
  );

  // using ref since state will cause re-render
  const districtNameRef = React.useRef<HTMLDivElement>(null);
  function handleMouseOver(e: any) {
    if (districtNameRef.current) {
      districtNameRef.current.innerHTML = e.feature.properties.district
        ? e.feature.properties.district
        : e.feature.properties.revenue_ci;
    }
  }

  function handleMouseOut(e: any) {
    if (districtNameRef.current) {
      districtNameRef.current.innerHTML =
      e.feature.properties.district ? 'District' : 'Revenue Circle';
    }
  }

  const searchParams = useSearchParams();
  const indicatorParam = searchParams.get('indicator');
  const SubIndicatorParam = searchParams.get('sub-indicator');

  const [FilteredRevenueCircleFeatures, setFilteredFeatures] = React.useState(
    []
  );

  const mapDataFn = (value: number) => {
    return value >= 3
      ? '#d73027'
      : value >= 2
      ? '#fc8d59'
      : value >= 1
      ? '#fee090'
      : value >= 0.5
      ? '#dbeaee'
      : value >= 0.3
      ? '#91bfdb'
      : '#4575b4';
  };

  const filterByRevenue = (features: any) => {
    if (revenueMapFile.features) {
      const filteredFeatures = revenueMapFile.features.filter(
        (feature: { properties: { district_1: string } }) =>
          feature.properties.district_1 === features?.district
      );
      setFilteredFeatures(filteredFeatures);
    }
  };

  return (
    <div className="relative w-full rounded-05 hidden md:block">
      {!mapLoading && !revenueMapLoading && (
        <LeafletChoropleth
          features={
            boundary === 'district' ? mapFile.features : revenueMapFile.features
          }
          mapZoom={7.4}
          scrollWheelZoom={false}
          mapProperty={SubIndicatorParam || indicatorParam || 'composite-score'}
          zoomOnClick={true}
          legendData={[
            {
              color: '#d73027',
              label: '3+',
            },
            {
              color: '#fc8d59',
              label: '2 - 3',
            },
            {
              color: '#fee090',
              label: '1 - 2',
            },
            {
              color: '#dbeaee',
              label: '0.5 - 1',
            },
            {
              color: '#91bfdb',
              label: '0.3 - 0.5',
            },
            {
              color: '#4575b4',
              label: '0 - 0.3',
            },
          ]}
          mapDataFn={mapDataFn}
          click={(e) => {
            filterByRevenue(e.feature.properties);
          }}
          mouseover={handleMouseOver}
          mouseout={handleMouseOut}
        />
      )}
      <div
        ref={districtNameRef}
        className="py-2 px-4 bg-backgroundDefault absolute top-8 right-16 border-1 border-solid border-borderDefault rounded-1 z-max h-[40px]"
      >
        {boundary === 'district' ? 'District' : 'Revenue Circle'}
      </div>
    </div>
  );
}

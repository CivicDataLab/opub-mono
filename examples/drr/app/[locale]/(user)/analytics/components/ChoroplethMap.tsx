'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { useFetch } from '@/lib/api';

const LeafletChoropleth = dynamic(
  () => import('opub-viz/src').then((mod) => mod.LeafletChoropleth),
  { ssr: false }
);

export function MapComponent({ revenueDataloading , revenueData , boundary }: { revenueDataloading : Boolean; revenueData: any; boundary: string }) {
  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `assam-mapFile`,
    `/files/assam.json`
  );

  // const { data: revenueMapFile, isLoading: revenueMapLoading } = useFetch(
  //   `assam-RevenueMapFile`,
  //   `/files/assam_block.json`
  // );

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
      districtNameRef.current.innerHTML = e.feature.properties.district
        ? 'District'
        : 'Revenue Circle';
    }
  }

  const searchParams = useSearchParams();
  const indicatorParam = searchParams.get('indicator');
  const SubIndicatorParam = searchParams.get('sub-indicator');

  const [FilteredRevenueCircleFeatures, setFilteredFeatures] = React.useState(
    []
  );

  const mapDataFn = (value: number) => {
    return value >= 5
      ? '#d73027'
      : value >= 4
      ? '#fc8d59'
      : value >= 3
      ? '#fee090'
      : value >= 2
      ? '#dbeaee'
      : value >= 1
      ? '#91bfdb'
      : '#4575b4';
  };

  const filterByRevenue = (features: any) => {
    if (revenueData?.features) {
      const filteredFeatures = revenueData?.features.filter(
        (feature: { properties: { district_1: string } }) =>
          feature.properties.district_1 === features?.district
      );
      setFilteredFeatures(filteredFeatures);
    }
  };

  return (
    <div className="relative w-full rounded-05 hidden md:block">
      {!mapLoading && !revenueDataloading && (
        <LeafletChoropleth
          features={
            boundary === 'district' ? mapFile.features : revenueData?.features
          }
          mapZoom={7.4}
          scrollWheelZoom={false}
          mapProperty={SubIndicatorParam || indicatorParam || 'composite-score'}
          zoomOnClick={true}
          legendData={[
            {
              color: '#d73027',
              label: 'High',
            },
            {
              color: '#fc8d59',
              label: '',
            },
            {
              color: '#fee090',
              label: 'Medium',
            },
            {
              color: '#dbeaee',
              label: '',
            },
            {
              color: '#4575b4',
              label: 'Low',
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

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


  const searchParams = useSearchParams();
  const indicatorParam = searchParams.get('indicator');
  const SubIndicatorParam = searchParams.get('sub-indicator');

  const [hovered, setHovered] = React.useState('District');
  const [FilteredRevenueCircleFeatures, setFilteredFeatures] = React.useState([]);


  const mapDataFn = (value: number) => {
    return value >= 80
      ? '#d73027'
      : value >= 70
      ? '#fc8d59'
      : value >= 50
      ? '#fee090'
      : value >= 40
      ? '#dbeaee'
      : value >= 30
      ? '#91bfdb'
      : '#4575b4';
  };

  const filterByRevenue = (features : any) => {
    if(revenueMapFile.features) {
      const filteredFeatures = revenueMapFile.features.filter((feature: { properties: { district_1: string; }; })  => feature.properties.district_1 === features?.district)
      setFilteredFeatures(filteredFeatures)
    }
  }

  return (
    <div className="relative w-[900px] rounded-05 hidden md:block">
      {!mapLoading && !revenueMapLoading && (
        <LeafletChoropleth
          features={ boundary === 'district' ? FilteredRevenueCircleFeatures.length !==0 ? FilteredRevenueCircleFeatures   :  mapFile.features : revenueMapFile.features}
          mapZoom={7.4}
          mapProperty={SubIndicatorParam || indicatorParam || 'composite-score'}
          zoomOnClick={true}
          legendData={[
            {
              color: '#d73027',
              label: '80+',
            },
            {
              color: '#fc8d59',
              label: '60 - 80',
            },
            {
              color: '#fee090',
              label: '50 - 60',
            },
            {
              color: '#dbeaee',
              label: '40 - 50',
            },
            {
              color: '#91bfdb',
              label: '30 - 40',
            },
            {
              color: '#4575b4',
              label: '0 - 30',
            },
          ]}
          mapDataFn={mapDataFn}
          click={(e) => {
            filterByRevenue(e.feature.properties)
          }}
          mouseover={(e) => {
            setHovered(e.feature.properties.district);
          }}
          mouseout={() => {
            setHovered('District');
          }}
        />
      )}
    </div>
  );
}

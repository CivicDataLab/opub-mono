'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Spinner } from 'opub-ui';

const LeafletChoropleth = dynamic(
  () => import('opub-viz/src').then((mod) => mod.LeafletChoropleth),
  { ssr: false }
);

export function MapComponent({
  revenueDataloading,
  revenueData,
  districtDataloading,
  districtData,
  boundary,
  dropDownValue
}: {
  revenueDataloading: Boolean;
  revenueData: any;
  districtDataloading: boolean;
  districtData: any;
  boundary: string;
  dropDownValue: string;
}) {
  // using ref since state will cause re-render
  const districtNameRef = React.useRef<HTMLDivElement>(null);
  function handleMouseOver(e: any) {
    if (districtNameRef.current) {
      districtNameRef.current.innerHTML = e.feature.properties.name;
    }
  }

  const [mapBoundary, setMapBoundary] = React.useState(boundary);

  React.useEffect(() => {
    setMapBoundary(boundary);
  }, [boundary]);

  function handleMouseOut(e: any) {
    if (districtNameRef.current) {
      districtNameRef.current.innerHTML =
        e.feature.properties.type === 'DISTRICT'
          ? 'District'
          : 'Revenue Circle';
    }
  }

  const searchParams = useSearchParams();
  const indicatorParam = searchParams.get('indicator');
  const SubIndicatorParam = searchParams.get('sub-indicator');


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

  const mapProperty = SubIndicatorParam || indicatorParam || 'composite-score';

  return (
    <div className="relative w-full rounded-05 hidden md:block">
      {!districtDataloading && !revenueDataloading ? (
        <LeafletChoropleth
          features={
            mapBoundary === 'district'
              ? districtData.features
              : revenueData?.features
          }
          mapZoom={7.4}
          zoomOnClick={false}
          classifyData={
            ![
              'damages-losses',
              'population-affected-total',
              'human-live-lost',
              'crop-area',
              'total-house-fully-damaged',
            ].includes(mapProperty)
          }
          fillOpacity={1}
          filterLabel={dropDownValue !== '' && boundary === 'district' ? dropDownValue : ''}
          filterProperty={'district-code'}
          scrollWheelZoom={false}
          mapProperty={mapProperty}
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
              color: '#e0f3f8',
              label: '',
            },
            {
              color: '#91bfdb',
              label: '',
            },
            {
              color: '#4575b4',
              label: 'Low',
            },
          ]}
          mapDataFn={mapDataFn}
          mouseover={handleMouseOver}
          mouseout={handleMouseOut}
        />
      ) : (
        <center className="grid place-content-center items-center h-full">
          <Spinner />
        </center>
      )}
      <div
        ref={districtNameRef}
        className="py-2 px-4 bg-surfaceDefault absolute top-4 right-16 border-1 border-solid border-borderDefault rounded-1 z-max h-[40px]"
      >
        {mapBoundary === 'district' ? 'District' : 'Revenue Circle'}
      </div>
    </div>
  );
}

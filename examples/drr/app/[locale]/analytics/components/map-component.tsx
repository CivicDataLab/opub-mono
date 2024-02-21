'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Spinner, Text } from 'opub-ui';

import { FactorList } from './factor-list';

const MapChart = dynamic(
  () => import('opub-ui/viz').then((mod) => mod.MapChart),
  {
    ssr: false,
  }
);
export const MapComponent = ({
  indicator,
  regions,
  mapDataloading,
  setRegion,
  mapData,
}: {
  indicator: string;
  regions: { label: string; value: string }[];
  mapDataloading: Boolean;
  setRegion: any;
  mapData: any;
}) => {
  const [map, setMap] = React.useState<any>(null);
  const mapDataFn = (value: number) => {
    let colorString;
    switch (value) {
      case 1:
        colorString = '#4575b4';
        break;
      case 2:
        colorString = '#65A4BD';
        break;
      case 3:
        colorString = '#FFED6E';
        break;
      case 4:
        colorString = '#FB8C35';
        break;
      case 5:
        colorString = '#D41505';
        break;
      default:
        colorString = '#4575b4';
        break;
    }
    return colorString;
  };

  const legendData = [
    {
      label: 'Very High Risk',
      color: '#D41505',
    },
    {
      label: 'High Risk',
      color: '#FB8C35',
    },
    {
      label: 'Medium Risk',
      color: '#FFED6E',
    },
    {
      label: 'Low Risk',
      color: '#65A4BD',
    },
    {
      label: 'Very Low Risk',
      color: '#4575b4',
    },
  ];

  React.useEffect(() => {
    const regionsArray: string[] = [];
    regions?.forEach((region) => {
      regionsArray.push(region.label);
    });

    if (map) {
      const openPopups: any[] = [];
      map.options.maxZoon = 10;

      map.eachLayer((layer: any) => {
        const regionName = layer.feature?.properties.name;
        const riskValue = layer.feature?.properties?.[indicator];

        if (regionsArray.includes(regionName)) {
          const popup = layer.getPopup();
          if (popup) {
            openPopups.push(popup);
          } else {
            layer
              .bindPopup(
                () => {
                  return `<span>${regionName}: ${riskValue}<br/></span>`;
                },
                {
                  maxWidth: 200,
                  closeButton: false,
                  autoClose: false,
                  closeOnEscapeKey: false,
                  closeOnClick: false,
                  id: `${regionName}`,
                  className: 'opub-leaflet-popup',
                }
              )
              .openPopup();
          }
        } else {
          layer.closePopup();
          layer.unbindPopup();
          // Remove the layer from the map
          if (layer.getPopup()) {
            map.removeLayer(layer);
          }
        }
      });

      // Close the last open popup if regionsArray is empty
      if (regionsArray.length === 0 && openPopups.length > 0) {
        const lastLayer = openPopups[openPopups.length - 1];
        map.removeLayer(lastLayer);
      }
    }
  }, [indicator, map, regions]);

  if (mapDataloading)
    return (
      <div className="grid h-full place-content-center">
        <Spinner color="highlight" />
        <Text>Loading...</Text>
      </div>
    );

  return (
    <div className=" relative h-[90%] w-full py-4">
      <FactorList />
      <MapChart
        features={mapData?.features}
        mapZoom={7.2}
        mapProperty={indicator}
        zoomOnClick={false}
        legendData={legendData}
        minZoom={6.5}
        maxZoom={7.4}
        mapDataFn={mapDataFn}
        click={(layer) =>
          setRegion([layer?.feature?.properties?.code], { shallow: false })
        }
        fillOpacity={1}
        setMap={setMap}
        scroolWheelZoom={false}
      />
    </div>
  );
};

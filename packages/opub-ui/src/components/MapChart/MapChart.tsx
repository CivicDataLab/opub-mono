'use client';

import React from 'react';
import { IconStack } from '@tabler/icons-react';
import { GeoJSON, MapContainer, ScaleControl, TileLayer } from 'react-leaflet';
import { FullscreenControl } from 'react-leaflet-fullscreen';

import 'react-leaflet-fullscreen/styles.css';

import { LatLngExpression } from 'leaflet';

import { cn } from '../../utils';
import { Popover } from '../Popover';
import { RadioGroup, RadioItem } from '../RadioGroup';
import { Text } from '../Text';
import styles from './MapChart.module.scss';

const layers = {
  light: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  satellite:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
} as const;
type layerOptions = keyof typeof layers;

type MapProps = {
  /* Map file to be used */
  features: any;

  /* callback function on mouseover */
  mouseover?: (e: any) => void;

  /* callback function on mouseout */
  mouseout?: (e: any) => void;

  /* callback function on click */
  click?: (e: any) => void;

  /* property to be used for mapping value */
  mapProperty?: string;

  /* function to map data to color */
  mapDataFn: (value: any, type: 'default' | 'hover' | 'selected') => string;

  /* theme of the map */
  defaultLayer?: layerOptions;

  /* zoom level of the map */
  mapZoom?: number;

  /* minimum zoom level of the map */
  minZoom?: number;

  /* maximum zoom level of the map */
  maxZoom?: number;

  /* center of the map */
  mapCenter?: LatLngExpression;

  /* zoom on click */
  zoomOnClick?: boolean;

  /* hide layers */
  hideLayers?: boolean;

  /* hide scale */
  hideScale?: boolean;

  /* fill opacity */
  fillOpacity?: number;

  /* className */
  className?: string;

  /* set map reference */
  setMap?: any;

  /* full screen */
  fullScreen?: boolean;

  /* disable zoom on scroll */
  scroolWheelZoom?: boolean;
};

type LegendProps = {
  /* data for legend */
  legendData?: { label: string; color: string }[];

  /* heading for legend */
  legendHeading?: { heading: string; subheading?: string };
};

type Props = MapProps & LegendProps;

const MapChart = (props: Props) => {
  const { defaultLayer = 'light', className, ...others } = props;

  //to prevent map re-initialization
  const [unmountMap, setUnmountMap] = React.useState(false);
  React.useLayoutEffect(() => {
    setUnmountMap(false);
    return () => {
      setUnmountMap(true);
    };
  }, []);

  const [selectedLayer, setSelectedLayer] =
    React.useState<layerOptions>(defaultLayer);

  if (unmountMap) return <>{'loading map...'}</>;

  return (
    <div className={cn(styles.Wrapper, className)}>
      <Map
        selectedLayer={selectedLayer}
        setLayer={setSelectedLayer}
        {...others}
      />
    </div>
  );
};

const Map = ({
  features,
  mouseover,
  mouseout,
  click,
  selectedLayer,
  mapProperty = '',
  mapZoom = 7,
  minZoom,
  maxZoom,
  mapCenter = [26.193, 92.773],
  zoomOnClick = false,
  fillOpacity,
  hideScale = false,
  mapDataFn,
  hideLayers = false,
  setLayer,
  legendData,
  legendHeading,
  setMap,
  fullScreen = true,
  scroolWheelZoom = true,
}: MapProps & {
  selectedLayer: layerOptions;
  setLayer: any;
  legendData?: { label: string; color: string }[];
  legendHeading?: { heading: string; subheading?: string };
}) => {
  const mapRef = React.useRef<any>(null);

  if (!features)
    return (
      <div className="flex h-[300px] flex-col items-center justify-center">
        <Text>Please provide GeoJSON</Text>
      </div>
    );

  if (!mapDataFn)
    return (
      <div className="flex h-[300px] flex-col items-center justify-center">
        <Text>Please provide mapDataFn</Text>
      </div>
    );

  const handleMouseOver = React.useCallback((e: { target: any }) => {
    var layer = e.target;

    layer.setStyle({
      fillColor: mapDataFn(
        Number(layer.feature.properties[mapProperty]),
        'hover'
      ),
    });

    mouseover && mouseover(layer);
  }, []);

  const handleMouseOut = React.useCallback((e: { target: any }) => {
    var layer = e.target;

    layer.setStyle(style(layer.feature));
    mouseout && mouseout(layer);
  }, []);

  function handleClick(e: { target: any }) {
    var layer = e.target;

    layer.setStyle({
      fillColor: mapDataFn(
        Number(layer.feature.properties[mapProperty]),
        'selected'
      ),
    });

    if (zoomOnClick) {
      const map = mapRef.current;
      map.fitBounds(layer.getBounds());
    }

    click && click(layer);
  }

  const onEachFeature = (_: any, layer: any) => {
    layer.on({
      mouseover: handleMouseOver,
      mouseout: handleMouseOut,
      click: handleClick,
    });
  };

  const style: any = (feature: { properties: { [x: string]: number } }) => {
    return {
      fillColor: mapDataFn(Number(feature.properties[mapProperty]), 'default'),
      weight: 1,
      opacity: 1,
      color:
        selectedLayer === 'dark' ? '#eee' : 'var(--mapareadistrict-border)',
      fillOpacity: fillOpacity ? fillOpacity : 0.9,
    };
  };

  const feature: any = features.map((feature: any) => {
    return feature;
  });

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      ref={setMap}
      zoomDelta={0.5}
      zoomSnap={0.5}
      minZoom={minZoom}
      maxZoom={maxZoom}
      scrollWheelZoom={scroolWheelZoom}
    >
      {!hideLayers && (
        <>
          <LayerSelector
            selectedLayer={selectedLayer}
            setSelectedLayer={setLayer}
          />
          <TileLayer url={layers[selectedLayer]} key={selectedLayer} />
        </>
      )}
      {legendData && (
        <Legend legendData={legendData} legendHeading={legendHeading} />
      )}
      {fullScreen && <FullscreenControl />}

        {features && (
          <>
            <GeoJSON
              data={feature}
              key={feature}
              style={style}
              onEachFeature={onEachFeature}
            />
          </>
        )}
        {!hideScale && <ScaleControl imperial={false} />}
      </MapContainer>
  );
};

const Legend = ({ legendData, legendHeading }: LegendProps) => {
  if (!legendData) return null;

  const className = cn(styles.Legend);
  return (
    <div className={className}>
      {legendHeading && (
        <div className="flex flex-col gap-1">
          <Text variant="headingMd">{legendHeading.heading}</Text>
          {legendHeading.subheading && (
            <Text variant="bodyMd" color="subdued">
              {legendHeading.subheading}
            </Text>
          )}
        </div>
      )}
      <div className="flex flex-col gap-1">
        {legendData.map((item) => {
          return (
            <div
              key={item.label}
              style={{ '--color': item.color } as React.CSSProperties}
              className={cn(styles.LegendItem)}
            >
              <Text variant="bodyMd">{item.label}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LayerSelector = ({
  selectedLayer,
  setSelectedLayer,
}: {
  selectedLayer: layerOptions;
  setSelectedLayer: (selectedLayer: layerOptions) => void;
}) => {
  const className = cn(styles.LayerSelector);

  return (
    <div className={className}>
      <Popover>
        <Popover.Trigger>
          <button
            className={cn(
              'rounded-1 border-solid border-borderHighlightSubdued bg-surfaceHighlightSubdued p-1 leading-[0] hover:bg-surfaceHighlightDefault'
            )}
          >
            <span className="sr-only">Change Layer</span>
            <span aria-hidden="true">
              <IconStack color="var(--icon-highlight)" />
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Content align="end" className="px-3 py-2">
          <RadioGroup
            onChange={(val: any) => {
              setSelectedLayer(val);
            }}
            name="mapTheme"
            value={selectedLayer}
            title="Change Layer"
          >
            {Object.keys(layers).map((layer: any) => {
              return (
                <RadioItem key={layer} value={layer}>
                  {layer}
                </RadioItem>
              );
            })}
          </RadioGroup>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default MapChart;

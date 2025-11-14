'use client';

import React from 'react';
import { IconHome, IconStack, IconZoomReset } from '@tabler/icons-react';
// import { FullscreenControl } from 'react-leaflet-fullscreen';

// import 'react-leaflet-fullscreen/styles.css';

// import 'leaflet/dist/leaflet.css';

import { LatLngExpression } from 'leaflet';
import {
  GeoJSON,
  MapContainer,
  ScaleControl,
  TileLayer,
  useMap,
} from 'react-leaflet';

import { cn } from '../../utils';
import FullscreenControl from '../../utils/FullscreenControl';
import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { RadioGroup, RadioItem } from '../RadioGroup';
import { Text } from '../Text';
import styles from './MapChart.module.scss';

const layers = {
  light:
    'https://api.mapbox.com/styles/v1/tech-civicdatalab/cm16if6hx020101qyeijacngt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGVjaC1jaXZpY2RhdGFsYWIiLCJhIjoiY20xNmk2Z2MyMGpldjJxcXY0NjlmcnZkZCJ9.8jTki9brBl78_VIHImdLow',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  satellite:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
} as const;
type layerOptions = keyof typeof layers;

type MapProps = {
  /* Map file to be used */
  features: any;

  /* Additional map files to be displayed */
  addlFeaturesArray?: Array<any>;
  addlFeaturesStyleArray?: Array<any>;

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

  // reset zoom
  resetZoom?: boolean;

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

  /* min zoom */
  minZoom?: number;

  /* max zoom */
  maxZoom?: number;

  /* horizontal legend */
  horizontalLegend?: boolean;

  /* show sequential colors */
  isCustomColor?: boolean;

  /* set sequential colors */
  customColor?: (value: number) => string;

  /* height of the map */
  height?: string;
};

type LegendProps = {
  /* data for legend */
  legendData?: { label: string; color: string }[];

  /* heading for legend */
  legendHeading?: { heading: string; subheading?: string };

  /* set horizontal legend */
  horizontalLegend?: boolean;
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
    <div
      className={cn(styles.Wrapper, className)}
      style={{ height: props?.height }}
    >
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
  addlFeaturesArray,
  addlFeaturesStyleArray,
  mouseover,
  mouseout,
  click,
  selectedLayer,
  mapProperty = '',
  mapZoom = 7,
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
  fullScreen = false,
  scroolWheelZoom = true,
  minZoom,
  maxZoom,
  horizontalLegend = false,
  isCustomColor = false,
  resetZoom = false,
  customColor,
}: MapProps & {
  selectedLayer: layerOptions;
  setLayer: any;
  legendData?: { label: string; color: string }[];
  legendHeading?: { heading: string; subheading?: string };
}) => {
  const [mapRef, setMapRef] = React.useState<any>(null);

  React.useEffect(() => {
    // Remove the flag appearing before Leaflet
    const attrMap = document.querySelector('.leaflet-attribution-flag');
    attrMap?.setAttribute('style', 'display: none !important;');

    // Replace the target and rel attributes from the attribution links
    const attributionLinks = document?.querySelectorAll(
      '.leaflet-control-attribution a'
    );

    attributionLinks.forEach((link) => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }, []);

  React.useEffect(() => {
    if (mapRef && resetZoom) {
      const controlElm = mapRef._container?.querySelector('.leaflet-control');
      const button = mapRef._container.querySelector(
        '[data-type="reset-zoom"]'
      );

      controlElm?.appendChild(button);
      button.classList.remove('hidden');
    }
  }, [mapRef]);

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
      weight: 2,
    });

    mouseover && mouseover(layer);
  }, []);

  const handleMouseOut = React.useCallback((e: { target: any }) => {
    var layer = e.target;

    // layer.setStyle(style(layer.feature));
    layer.setStyle({
      weight: 1,
    });
    mouseout && mouseout(layer);
  }, []);

  function handleClick(e: { target: any }) {
    var layer = e.target;

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
      fillColor: isCustomColor
        ? customColor?.(Number(feature.properties[mapProperty]))
        : mapDataFn(Number(feature.properties[mapProperty]), 'default'),
      weight: 1,
      opacity: 1,
      color: selectedLayer === 'dark' ? '#eee' : '#000',
      fillOpacity: fillOpacity ? fillOpacity : 0.9,
    };
  };

  const mapPrimaryFeature: any = features.map((feature: any) => {
    return feature;
  });

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        ref={(e) => {
          setMap && setMap(e);
          setMapRef(e);
        }}
        // key={new Date().getTime()}
        zoomDelta={0.5}
        zoomSnap={0.5}
        scrollWheelZoom={scroolWheelZoom}
      >
        {!hideLayers && (
          <>
            <LayerSelector
              selectedLayer={selectedLayer}
              setSelectedLayer={setLayer}
            />
            <TileLayer
              attribution='
              &copy;
              <a href="https://www.mapbox.com/about/maps/">Mapbox</a>
              <span aria-hidden="true">|</span>
              &copy;
              <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
              <span aria-hidden="true">|</span>
              <a href="https://labs.mapbox.com/contribute/">Improve this map</a>
              '
              maxZoom={maxZoom}
              minZoom={minZoom}
              url={layers[selectedLayer]}
              key={selectedLayer}
            />
          </>
        )}
        {legendData && (
          <Legend
            legendData={legendData}
            legendHeading={legendHeading}
            horizontalLegend={horizontalLegend}
          />
        )}
        {fullScreen && <FullscreenControl />}

        {features && (
          <>
            <GeoJSON
              data={mapPrimaryFeature}
              key={mapPrimaryFeature}
              style={style}
              onEachFeature={onEachFeature}
            />

            {addlFeaturesArray &&
              addlFeaturesArray?.map((addlItem, indx) => (
                <GeoJSON
                  data={addlItem.features}
                  key={indx}
                  style={
                    addlFeaturesStyleArray
                      ? addlFeaturesStyleArray[indx]
                      : {
                          fillColor: isCustomColor
                            ? customColor?.(
                                Number(
                                  mapPrimaryFeature?.properties?.[mapProperty]
                                )
                              )
                            : mapDataFn(
                                Number(
                                  mapPrimaryFeature?.properties?.[mapProperty]
                                ),
                                'default'
                              ),
                          weight: 1,
                          opacity: 1,
                          color: selectedLayer === 'dark' ? '#eee' : '#000',
                          fillOpacity: fillOpacity ? fillOpacity : 0.9,
                        }
                  }
                  // onEachFeature={onEachFeature}
                />
              ))}
          </>
        )}

        {!hideScale && <ScaleControl imperial={false} />}

        <button
          onClick={() => {
            mapRef.setView(mapCenter, mapZoom);
          }}
          data-type="reset-zoom"
          className="hidden cursor-pointer rounded-b-0 border-none bg-surfaceDefault p-1 leading-[0] hover:bg-surfaceSubdued"
        >
          <span className="sr-only">Reset Zoom</span>
          <span aria-hidden="true">
            <Icon source={IconZoomReset} color="highlight" size={22} />
          </span>
        </button>
      </MapContainer>
    </>
  );
};

const Legend = ({
  legendData,
  legendHeading,
  horizontalLegend,
}: LegendProps) => {
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
      <div className={cn('flex gap-1', !horizontalLegend && 'flex-col')}>
        {legendData.map((item) => {
          return (
            <div
              key={item.label}
              style={{ '--color': item.color } as React.CSSProperties}
              className={cn(styles.LegendItem, horizontalLegend && 'flex-col')}
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
